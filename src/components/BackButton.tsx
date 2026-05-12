"use client";

import { Button, type ButtonProps } from "@mantine/core";
import { useRouter } from "next/navigation";

interface BackButtonProps extends ButtonProps {
  href: string;
}

export function BackButton({ href, ...props }: BackButtonProps) {
  const router = useRouter();

  return <Button {...props} onClick={() => router.push(href)} />;
}
