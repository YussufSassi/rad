/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Prompt } from "@prisma/client";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);
export const generateCodeRouter = createTRPCRouter({
  generateCode: protectedProcedure
    .input(z.object({ prompt: z.string(), language: z.string() }))
    .query(async ({ input, ctx }) => {
      const prompt = `${input.language == "python" ? "#" : "//"} ${
        input.prompt
      } in ${input.language}`;

      const completion = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        best_of: 10,
      });

      const split_code = completion.data.choices[0]?.text?.split("\n");
      const code = split_code
        ?.filter((line) =>
          line.startsWith("\n+") || line.startsWith("+")
            ? line.substring(1)
            : line
        )
        .join("\n");
      if (!code) return "Couldn't generate code";

      await ctx.prisma.prompt.create({
        data: {
          code,
          createdAt: new Date(),
          language: input.language,
          prompt: prompt,
          userId: ctx.session.user.id,
        },
      });

      return code;
    }),

  getCodeHistory: protectedProcedure.query(async ({ ctx }) => {
    const prompts: Prompt[] = await ctx.prisma.prompt.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return prompts;
  }),
});
