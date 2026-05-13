import { Stack, Title } from "@mantine/core";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BackButton } from "@/components/BackButton";
import { ListingForm } from "@/components/ListingForm";

// Metadata works here because this is a Server Component
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("page.novy.title"),
    description: t("page.novy.description"),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <Stack align="center" w="100%">
      <BackButton color="orange" href="/cs/inzeraty">
        {t("page.novy.backButton")}
      </BackButton>

      <Stack align="stretch" w="700px">
        <Title pb="xl">{t("page.novy.title")}</Title>

        {/* We do NOT pass 't' as a prop to avoid serialization errors */}
        <ListingForm />
      </Stack>
    </Stack>
  );
}
