import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import { IconBrandDiscord } from "@tabler/icons";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const session = useSession();

  return (
    <div
      className={classes.wrapper}
      style={{
        height: "100vh",
      }}
    >
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            rad
          </Text>{" "}
          tool that generates code for you
        </h1>

        <Text className={classes.description} color="dimmed">
          Rad let&apos;s you generate code snippets in JavaScript, Python, C++
          and Go. Powered by OpenAI&apos;s Codex model, rad provides fast and
          high-quality solutions to your problems.
        </Text>

        <Group className={classes.controls}>
          {session.status == "unauthenticated" ? (
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              leftIcon={<IconBrandDiscord />}
              onClick={() => void signIn("discord")}
            >
              Register with Discord
            </Button>
          ) : (
            <Link href={"/generate_code"}>
              <Button
                size="xl"
                className={classes.control}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                Generate Code
              </Button>
            </Link>
          )}
        </Group>
      </Container>
    </div>
  );
}
