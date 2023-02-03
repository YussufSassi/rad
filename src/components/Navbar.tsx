import { useState } from "react";
import { useRouter } from "next/router";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";
import { IconCode, IconHistory, IconRadioactive } from "@tabler/icons";
import { IconHome2, IconLogout, IconLogin } from "@tabler/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  path?: string;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", path: "/" },
  { icon: IconCode, label: "Generate Code", path: "/generate_code" },
  { icon: IconHistory, label: "History", path: "/history" },
];

export default function NavbarMinimalColored() {
  const [active, setActive] = useState(0);
  const sessionData = useSession();
  const router = useRouter();
  const links = mockdata.map((link, index) =>
    link.path ? (
      <Link href={link.path} key={link.label}>
        <NavbarLink
          {...link}
          active={router.pathname === link.path}
          onClick={() => setActive(index)}
        />
      </Link>
    ) : (
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    )
  );

  return (
    <Navbar
      height={"100%"}
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        position: "fixed",
      })}
    >
      <Center>
        <IconRadioactive type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10}>
          {sessionData.data ? (
            <Avatar
              src={sessionData.data.user.image}
              alt="Profile Picture"
              radius="xl"
            />
          ) : null}

          {sessionData.data ? (
            <NavbarLink
              icon={IconLogout}
              onClick={() => void signOut()}
              label="Logout"
            />
          ) : (
            <NavbarLink
              icon={IconLogin}
              onClick={() => void signIn("discord")}
              label="Login"
            />
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
