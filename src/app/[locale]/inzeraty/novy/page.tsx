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
      <Stack align="stretch" w="700px">
        <Title pb="xl">{t("page.novy.title")}</Title>
        <Paper shadow="xs" radius="lg" withBorder p="md" mx="auto" w="100%">
          <TextInput label="Název produktu" withAsterisk pb="md" placeholder="např. Notebook" />
          <Textarea
            label="Popis produktu"
            withAsterisk
            autosize
            pb="md"
            minRows={2}
            placeholder="např. Prodám svůj starý notebook, který je stále v dobrém stavu."
          />
          <TextInput label="Město" withAsterisk pb="md" placeholder="např. Praha" />
          <Select
            label="Kategorie"
            withAsterisk
            pb="xs"
            placeholder="Vyberte kategorii"
            data={["Elektronika", "Nábytek", "Oblečení", "Knihy", "Jiné"]}
          />
          <Group justify="space-between" align="end" mt="md" grow>
            <NumberInput label="Cena (Kč)" withAsterisk suffix="kč" placeholder="např. 5000" min={0} step={100} />
            <Checkbox label="Zdarma" color="orange" />
          </Group>
          <Group justify="space-between" grow mt="md" pb="xs">
            <TextInput label="Jméno" withAsterisk placeholder="např. Jan Novák" />
            <TextInput label="E-mail" placeholder="např. jan.novak@email.com" />
          </Group>
          <Select
            label="Stav nabídky"
            withAsterisk
            pb="md"
            placeholder="Vyberte stav"
            data={["dostupné", "rezervované", "prodané"]}
          />
          <TextInput label="URL obrázku" pb="md" placeholder="např. https://example.com/obrazek.jpg" />
          <Text c="dimmed" size="sm" mt="xs">
            Platbu a předání si domlouvejte přímo s kupujícím.
          </Text>
          <Button mt="md" color="orange" fullWidth>
            Přidat inzerát
          </Button>
        </Paper>
      </Stack>
    </Stack>
  );
}
