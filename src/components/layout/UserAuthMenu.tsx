"use client";

import {
  Button,
  Group,
  Menu,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  Stack,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface User {
  email: string;
  name: string;
}

export function UserAuthMenu() {
  const t = useTranslations();
  const [user, setUser] = useState<User | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<string>("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 0 ? null : t("auth.validation.passwordRequired"),
    },
  });

  const handleSignIn = async (values: typeof form.values) => {
    setError("");

    // Simple demo authentication
    if (values.email === "demo@example.com" && values.password === "demo") {
      setUser({
        email: values.email,
        name: "Demo User",
      });
      form.reset();
      close();
    } else if (
      values.email === "test@example.com" &&
      values.password === "test"
    ) {
      setUser({
        email: values.email,
        name: "Test User",
      });
      form.reset();
      close();
    } else {
      setError(t("auth.error.invalidCredentials"));
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setError("");
  };

  if (user) {
    return (
      <Menu>
        <Menu.Target>
          <Button variant="subtle" rightSection={<LogOut size={16} />}>
            {user.name}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled>{user.email}</Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" onClick={handleSignOut}>
            {t("auth.signOut")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <>
      <Button onClick={open} leftSection={<LogIn size={16} />}>
        {t("auth.signIn")}
      </Button>

      <Modal opened={opened} onClose={close} title={t("auth.signIn")} centered>
        <form onSubmit={form.onSubmit(handleSignIn)}>
          <Stack gap="md">
            {error && (
              <Alert color="red" title={t("auth.error.title")}>
                {error}
              </Alert>
            )}

            <Text size="sm" c="dimmed">
              {t("auth.demo.hint")}
            </Text>

            <TextInput
              label={t("auth.email")}
              placeholder="demo@example.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label={t("auth.password")}
              placeholder={t("auth.password")}
              {...form.getInputProps("password")}
            />

            <Group justify="flex-end">
              <Button variant="default" onClick={close}>
                {t("auth.cancel")}
              </Button>
              <Button type="submit">{t("auth.signIn")}</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
