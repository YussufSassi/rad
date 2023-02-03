/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  TextInput,
  Group,
  Box,
  Container,
  Select,
  Tooltip,
  Center,
} from "@mantine/core";
import type { FormEvent } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import { Prism } from "@mantine/prism";
import Head from "next/head";
export type Language = "python" | "cpp" | "javascript" | "go";

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState<string>("Greet the user");
  const session = useSession();
  const [language, setLanguage] = useState<string>("python");
  const [loading, setLoading] = useState<boolean>(false);
  const codeGenerator = api.codeGenerator.generateCode.useQuery(
    { prompt, language },
    {
      retry: false,
      enabled: false,
    }
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (language && prompt) {
      setLoading(true);
      await codeGenerator.refetch();
      setLoading(false);
    }
  }

  if (session.status === "unauthenticated")
    return (
      <Center>
        <h1>You need to sign in to generate code</h1>
      </Center>
    );

  return (
    <>
      <Head>
        <title>Code Generator</title>
      </Head>

      <Container>
        <h1>Code Generator</h1>
        <form onSubmit={onSubmit}>
          <Group>
            <TextInput
              withAsterisk
              label="Prompt"
              defaultValue={prompt}
              placeholder="Print 'hello world'"
              onChange={(e) => {
                setPrompt(`${e.target.value}`);
              }}
            />
            <Select
              label="Select the language"
              placeholder="In Python"
              data={[
                { value: "javascript", label: "JavaScript" },
                { value: "python", label: "Python" },
                { value: "go", label: "Go" },
                { value: "cpp", label: "C++" },
              ]}
              defaultValue={language}
              onChange={(value) => {
                value && setLanguage(value);
              }}
              withAsterisk
            />
          </Group>

          <Group position="right" mt="md">
            <Tooltip label="This will take up to 2 minutes.">
              <Button
                type="submit"
                loading={loading}
                disabled={prompt.length === 0}
              >
                Submit
              </Button>
            </Tooltip>
          </Group>
        </form>

        <Box>
          {!codeGenerator.isLoading && codeGenerator.data ? (
            <Prism withLineNumbers language={language as Language}>
              {codeGenerator.data}
            </Prism>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
