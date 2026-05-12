import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { TextAlignCenter } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BackButton } from "@/components/BackButton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("page.novy.title"),
    description: t("page.novy.description"),
  };
}

export default async function Page(_: PageProps<"/[locale]">) {
  const t = await getTranslations();

  return (
    <Stack align="center" w="100%">
      <BackButton color="orange" href="/cs/inzeraty">
        {t("page.novy.backButton")}
      </BackButton>
      <Stack align="stretch" w="700px">
        <Title pb="xl">{t("page.novy.title")}</Title>
        <Paper shadow="xs" radius="lg" withBorder p="md" mx="auto" w="100%">
          <TextInput
            label={t("page.novy.titleLabel")}
            withAsterisk
            pb="md"
            placeholder={t("page.novy.titlePlaceholder")}
          />
          <Textarea
            label={t("page.novy.descriptionLabel")}
            withAsterisk
            autosize
            pb="md"
            minRows={2}
            placeholder={t("page.novy.descriptionPlaceholder")}
          />
          <TextInput
            label={t("page.novy.cityLabel")}
            withAsterisk
            pb="md"
            placeholder={t("page.novy.cityPlaceholder")}
          />
          <Select
            label={t("page.novy.categoryLabel")}
            withAsterisk
            pb="xs"
            placeholder={t("page.novy.categoryPlaceholder")}
            data={[
              { value: t("page.novy.category1"), label: t("page.novy.category1") },
              { value: t("page.novy.category2"), label: t("page.novy.category2") },
              { value: t("page.novy.category3"), label: t("page.novy.category3") },
              { value: t("page.novy.category4"), label: t("page.novy.category4") },
              { value: t("page.novy.category5"), label: t("page.novy.category5") },
            ]}
          />
          <Group justify="space-between" align="end" mt="md" grow>
            <NumberInput
              label={t("page.novy.priceLabel")}
              withAsterisk
              suffix="kč"
              placeholder={t("page.novy.pricePlaceholder")}
              min={0}
              step={100}
            />
            <Checkbox label={t("page.novy.freeLabel")} color="orange" />
          </Group>
          <Group justify="space-between" grow mt="md" pb="xs">
            <TextInput label={t("page.novy.nameLabel")} withAsterisk placeholder={t("page.novy.namePlaceholder")} />
            <TextInput label={t("page.novy.emailLabel")} placeholder={t("page.novy.emailPlaceholder")} />
          </Group>
          <Select
            label={t("page.novy.statusLabel")}
            withAsterisk
            pb="md"
            placeholder={t("page.novy.statusPlaceholder")}
            data={[
              { value: t("page.novy.status1"), label: t("page.novy.status1") },
              { value: t("page.novy.status2"), label: t("page.novy.status2") },
              { value: t("page.novy.status3"), label: t("page.novy.status3") },
            ]}
          />
          <TextInput label={t("page.novy.imageUrlLabel")} pb="md" placeholder={t("page.novy.imageUrlPlaceholder")} />
          <Text c="dimmed" size="sm" mt="xs">
            {t("page.novy.information")}
          </Text>
          <Button mt="md" color="orange" fullWidth>
            {t("page.novy.submitButton")}
          </Button>
        </Paper>
      </Stack>
    </Stack>
  );
}
