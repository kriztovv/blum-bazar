import { Badge, Button, Grid, GridCol, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BackButton } from "@/components/BackButton";
import { db } from "@/db";
import { type Item, items } from "@/db/schemas/item-schemas.schema";
import Link from "next/link";

function CategoryBadge({ categoryId, t }: { categoryId: number; t: any }) {
  if (categoryId === 0) {
    return <Badge color="blue">{t("page.novy.category1")}</Badge>;
  } else if (categoryId === 1) {
    return <Badge color="indigo">{t("page.novy.category2")}</Badge>;
  } else if (categoryId === 2) {
    return <Badge color="violet">{t("page.novy.category3")}</Badge>;
  }
  else if (categoryId === 3) {
    return <Badge color="grape">{t("page.novy.category4")}</Badge>;
  }
  else if (categoryId === 4) {
    return <Badge color="pink">{t("page.novy.category5")}</Badge>;
  }

}

interface AvailabilityProps {
  listing: Item;
  t: any;
}

function Availability({ listing, t }: AvailabilityProps) {
  const statusId = listing.statusID;

  if (statusId === 0) {
    return <Badge color="green">{t("page.novy.status1")}</Badge>;
  } else if (statusId === 1) {
    return <Badge color="yellow">{t("page.novy.status2")}</Badge>;
  } else {
    return <Badge color="red">{t("page.novy.status3")}</Badge>;
  }
}

// 1. Define params as a Promise type
export default async function ListingDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const t = await getTranslations();

  // 2. Await the params object before using it
  const resolvedParams = await params;
  const listingId = parseInt(resolvedParams.id, 10);

  // 3. Keep the safety check active to prevent bad queries
  if (isNaN(listingId)) {
    notFound();
  }

  // 4. Fetch the specific item from the database
  const listingResult = await db.select().from(items).where(eq(items.id, listingId));

  if (listingResult.length === 0) {
    notFound();
  }

  const listing = listingResult[0];

  return (
    <Stack w="100%" max-width="1000px" mx="auto">
      {/* Top Navigation Bar */}
<Group justify="space-between" align="center" pb="md">
  <BackButton variant="subtle" color="orange" href={`/${resolvedParams.locale}/inzeraty`}>
    &larr; Zpět na seznam
  </BackButton>

  {/* OPRAVA: Obalíme Button přímo do komponenty Link */}
  <Link href={`/${resolvedParams.locale}/inzeraty/${listing.id}/upravit`} style={{ textDecoration: 'none' }}>
    <Button
      variant="light"
      color="violet"
      radius="xl"
    >
      Upravit inzerát
    </Button>
  </Link>
</Group>

      {/* Main Content Area */}
      <Grid gap="xl">
        {/* LEFT COLUMN: Image */}
        <GridCol span={{ base: 12, md: 6 }}>
          <Paper shadow="xs" radius="lg" withBorder h="100%" style={{ overflow: "hidden" }}>
            {listing.imageUrl ? (
              <Image src={listing.imageUrl} alt={listing.title} h={400} fit="cover" />
            ) : (
              <Group h={400} display="flex" justify="center" align="center" bg="gray.1">
                <Stack align="center" gap="xs">
                  <Text size="xl" c="gray.4">
                    🖼️
                  </Text>
                  <Text c="dimmed">Náhled obrázku nabídky</Text>
                </Stack>
              </Group>
            )}
          </Paper>
        </GridCol>

        {/* RIGHT COLUMN: Details */}
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            {/* Title & Status */}
            <Group justify="space-between" align="flex-start">
              <Title order={2}>{listing.title}</Title>
              <CategoryBadge categoryId={listing.categoryID} t={t} />
            </Group>

            {/* Category & Price Tags */}
            <Group gap="xs">
              <Availability listing={listing} t={t} />
              {listing.price === 0 ? (
                <Badge color="teal">ZDARMA</Badge>
              ) : (
                <Badge color="violet">{listing.price} Kč</Badge>
              )}
            </Group>

            {/* Description */}
            <Text mt="sm">{listing.description}</Text>

            {/* Contact Info */}
            <Stack gap={0} mt="md">
              <Text fw={600}>Kontakt</Text>
              <Text>{listing.createdByName}</Text>
              <Text c="dimmed" size="sm">
                {listing.createdByEmail}
              </Text>
            </Stack>

            {/* Payment & Handover Info Box */}
            <Paper bg="violet.0" p="md" radius="md" mt="sm">
              <Group wrap="nowrap" align="flex-start">
                <Text c="violet" fw={700}>
                  ⓘ
                </Text>
                <Stack gap={4}>
                  <Text fw={600} size="sm">
                    Platba a předání
                  </Text>
                  <Text size="sm" c="dimmed">
                    Platbu a předání si domluvte přímo mezi sebou — hotově nebo QR platbou.
                  </Text>
                </Stack>
              </Group>
            </Paper>

            {/* Action Buttons */}
            <Group mt="xl">
              <Button color="orange">Rezervovat</Button>
              <Button variant="default">Označit jako prodáno</Button>
            </Group>
          </Stack>
        </GridCol>
      </Grid>
    </Stack>
  );
}
