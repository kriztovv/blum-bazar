"use client";

import { Button, Modal, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export function SignInButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load signed-in state from localStorage on mount
  useEffect(() => {
    const savedUserName = localStorage.getItem("userSignedIn");
    if (savedUserName) {
      setUserName(savedUserName);
    }
    setIsLoading(false);
  }, []);

  const handleSignIn = () => {
    if (email && password) {
      // Extract name from email (part before @)
      const name = email.split("@")[0];
      setUserName(name);
      // Save to localStorage
      localStorage.setItem("userSignedIn", name);
      // Reset form and close modal
      setEmail("");
      setPassword("");
      setIsModalOpen(false);
    }
  };

  const handleSignOut = () => {
    setUserName(null);
    localStorage.removeItem("userSignedIn");
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {userName ? (
        <Button variant="default" onClick={handleSignOut}>
          {userName} (Odhlásit se)
        </Button>
      ) : (
        <Button color="orange" onClick={() => setIsModalOpen(true)}>
          Přihlásit se
        </Button>
      )}

      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Přihlášení" centered>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="Váš email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Heslo"
            placeholder="Vaše heslo"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button color="orange" onClick={handleSignIn} fullWidth>
            Přihlásit se
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
