import { Box, Card, Group, Image, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BackButton } from "@/components/BackButton";
import { db } from "@/db";
import { items } from "@/db/schemas/item-schemas.schema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("page.inzeraty.title"),
    description: t("page.inzeraty.description"),
  };
}

export default async function Page(_: PageProps<"/[locale]">) {
  const t = await getTranslations();

  const listings = await db.select().from(items);

  return (
    <>
      <Title mb="md">{t("page.inzeraty.title")}</Title>
      <Group justify="space-between">
        <Text w="70%">{t("page.inzeraty.description")}</Text>
        <BackButton color="orange" href="/cs/inzeraty/novy">
          {t("page.inzeraty.newButton")}
        </BackButton>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {listings.map((listing) => (
          <Card key={listing.id} shadow="xs" radius="lg" withBorder p="md">
            {listing.imageUrl ? (
              <Image src={listing.imageUrl} alt={listing.title} h={200} fit="cover" radius="md" mb="sm" />
            ) : (
              <Paper h={200} mb="sm" bg="gray.4" radius="md">
                <Group h={200} mb="sm" display="flex" justify="center" align="center">
                  <Text c="dimmed">No image available</Text>
                </Group>
              </Paper>
            )}
            <Stack>
              <Title order={3}>{listing.title}</Title>
              <Text>{listing.description}</Text>
              <Text c="dimmed">{listing.city}</Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
