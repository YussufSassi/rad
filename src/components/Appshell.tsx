import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { SpotlightProvider } from "@mantine/spotlight";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { signOut, signIn, useSession } from "next-auth/react";
import {
  IconCode,
  IconHistory,
  IconHome,
  IconLogin,
  IconLogout,
} from "@tabler/icons";
function AppContainer({ children }: { children: ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const spotlightActions = [
    {
      title: "Home",
      description: "Get to home page",
      onTrigger: () => router.push("/"),
      icon: <IconHome size={18} />,
    },
    {
      title: "Generate code",
      description: "Go to the code generation page",
      onTrigger: () => router.push("/generate_code"),
      icon: <IconCode size={18} />,
    },
    {
      title: "History",
      description: "Go to the history page",
      onTrigger: () => router.push("/history"),
      icon: <IconHistory size={18} />,
    },
    {
      title: session.status == "unauthenticated" ? "Sign in" : "Sign out",
      description:
        session.status == "unauthenticated"
          ? "Sign into your account"
          : "Sign out of your account",
      onTrigger: () => {
        if (session.status == "unauthenticated") {
          void signIn("discord");
        } else {
          void signOut();
        }
      },
      icon:
        session.status == "unauthenticated" ? <IconLogin /> : <IconLogout />,
    },
  ];

  return (
    <AppShell navbar={<Navbar />} fixed={false} sx={{ top: 0, left: 0 }}>
      <SpotlightProvider
        shortcut={["mod + P", "mod + K", "/", "F1"]}
        actions={spotlightActions}
      >
        {children}
      </SpotlightProvider>
    </AppShell>
  );
}

export default AppContainer;
