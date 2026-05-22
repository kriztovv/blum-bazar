import { Badge, Button, Card, Group, Image, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BackButton } from "@/components/BackButton";
import { db } from "@/db";
import { type Item, items } from "@/db/schemas/item-schemas.schema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("page.inzeraty.title"),
    description: t("page.inzeraty.description"),
  };
}

interface AvailabilityProps {
  listing: Item;
  t: any; // Add 't' to the props
}

function Availability({ listing, t }: AvailabilityProps) {
  const statusId = listing.statusID;

  // Use the keys: page.novy.status1, status2, status3
  if (statusId === 0) {
    return <Badge color="green">{t("page.novy.status1")}</Badge>;
  } else if (statusId === 1) {
    return <Badge color="yellow">{t("page.novy.status2")}</Badge>;
  } else {
    return <Badge color="red">{t("page.novy.status3")}</Badge>;
  }
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
                  <Text c="dimmed">Náhled obrázku nabídky</Text>
                </Group>
              </Paper>
            )}
            <Stack>
              <Group justify="space-between">
                <Title order={3}>{listing.title}</Title>
                <Availability listing={listing} t={t} />
              </Group>

              <Text lineClamp={2}>{listing.description}</Text>

              {/* ZDE JE PŘIDANÁ CENA A MĚSTO V JEDNOM ŘÁDKU */}
              <Group justify="space-between" align="center">
                <Text c="dimmed">{listing.city}</Text>
                {listing.price === 0 ? (
                  <Badge color="teal" size="lg" variant="light">
                    ZDARMA
                  </Badge>
                ) : (
                  <Text fw={800} size="lg" c="orange">
                    {listing.price} Kč
                  </Text>
                )}
              </Group>
            </Stack>

            <a href={`/cs/inzeraty/${listing.id}`} style={{ textDecoration: "none" }}>
              <Button color="orange" mt="md" fullWidth>
                {t("page.inzeraty.viewButton")}
              </Button>
            </a>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
