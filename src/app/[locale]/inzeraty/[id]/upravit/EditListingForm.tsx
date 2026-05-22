"use client";

import { Button, Checkbox, Grid, GridCol, Group, Image, Paper, Select, Stack, Text, Textarea, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { type Item } from "@/db/schemas/item-schemas.schema";
import { BackButton } from "@/components/BackButton";
import { updateInzerat } from "@/app/actions";
// import { updateInzerat } from "@/app/actions"; // Tvá server action pro úpravu

interface EditListingFormProps {
  listing: Item;
  locale: string;
}

export function EditListingForm({ listing, locale }: EditListingFormProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      id: listing.id,
      title: listing.title || "",
      description: listing.description || "",
      city: listing.city || "",
      category: listing.categoryID?.toString() || "0",
      price: listing.price || 0,
      isFree: listing.price === 0,
      name: listing.createdByName || "",
      email: listing.createdByEmail || "",
      status: listing.statusID?.toString() || "0",
      imageUrl: listing.imageUrl || "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      console.log("Odesílání úprav:", values);
      await updateInzerat(values.id, values);
    } catch (error) {
      console.error("Úprava selhala:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
<form onSubmit={form.onSubmit(handleSubmit)}>

      {/* Stack už funguje jen jako rozvržení (bez component="form") */}
      <Stack w="100%" maw={1000} mx="auto">

        {/* Horní navigace */}
        <Group justify="space-between" align="center" pb="md">
          <BackButton variant="subtle" color="orange" href={`/${locale}/inzeraty/${listing.id}`}>
            &larr; Zpět na detail
          </BackButton>
          <Button type="submit" variant="light" color="violet" radius="xl" loading={loading}>
            Uložit změny
          </Button>
        </Group>
      </Stack>
      <Grid gap="xl">

        {/* LEVÝ SLOUPEC: Náhled obrázku + Pole pro editaci URL */}
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Paper shadow="xs" radius="lg" withBorder h={400} style={{ overflow: "hidden" }}>
              {form.values.imageUrl ? (
                <Image src={form.values.imageUrl} alt={form.values.title} h={400} fit="cover" />
              ) : (
                <Group h={400} display="flex" justify="center" align="center" bg="gray.1">
                  <Stack align="center" gap="xs">
                    <Text size="xl" c="gray.4">🖼️</Text>
                    <Text c="dimmed">Náhled obrázku nabídky</Text>
                  </Stack>
                </Group>
              )}
            </Paper>

            {/* Input pro URL hned pod obrázkem */}
            <TextInput
              label={t("page.novy.imageUrlLabel")}
              placeholder={t("page.novy.imageUrlPlaceholder")}
              {...form.getInputProps("imageUrl")}
            />
          </Stack>
        </GridCol>

        {/* PRAVÝ SLOUPEC: Detaily převedené na formulářové prvky */}
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack gap="md">

            {/* Řádek 1: Název produktu & Výběr Kategorie */}
            <Grid grow align="flex-start">
              <GridCol span={7}>
                <TextInput
                  label={t("page.novy.titleLabel")}
                  placeholder={t("page.novy.titlePlaceholder")}
                  withAsterisk
                  {...form.getInputProps("title")}
                />
              </GridCol>
              <GridCol span={5}>
                <Select
                  label={t("page.novy.categoryLabel")}
                  withAsterisk
                  data={[
                    { value: "0", label: t("page.novy.category1") },
                    { value: "1", label: t("page.novy.category2") },
                    { value: "2", label: t("page.novy.category3") },
                    { value: "3", label: t("page.novy.category4") },
                    { value: "4", label: t("page.novy.category5") },
                  ]}
                  {...form.getInputProps("category")}
                />
              </GridCol>
            </Grid>

            {/* Řádek 2: Stav nabídky (Selector) & Cena s Checkboxem */}
            <Grid grow align="end">
              <GridCol span={5}>
                <Select
                  label={t("page.novy.statusLabel")}
                  withAsterisk
                  data={[
                    { value: "0", label: t("page.novy.status1") }, // Dostupné
                    { value: "1", label: t("page.novy.status2") }, // Rezervované
                    { value: "2", label: t("page.novy.status3") }, // Prodáno
                  ]}
                  {...form.getInputProps("status")}
                />
              </GridCol>
              <GridCol span={4}>
                <NumberInput
                  label={t("page.novy.priceLabel")}
                  withAsterisk={!form.values.isFree}
                  suffix=" Kč"
                  disabled={form.values.isFree}
                  value={form.values.isFree ? 0 : form.values.price}
                  onChange={(val) => form.setFieldValue("price", Number(val))}
                />
              </GridCol>
              <GridCol span={3}>
                <Checkbox
                  label={t("page.novy.freeLabel")}
                  color="orange"
                  mb="xs"
                  {...form.getInputProps("isFree", { type: "checkbox" })}
                  onChange={(event) => {
                    const checked = event.currentTarget.checked;
                    form.setFieldValue("isFree", checked);
                    if (checked) form.setFieldValue("price", 0);
                  }}
                />
              </GridCol>
            </Grid>

            {/* Popis produktu */}
            <Textarea
              label={t("page.novy.descriptionLabel")}
              placeholder={t("page.novy.descriptionPlaceholder")}
              withAsterisk
              autosize
              minRows={3}
              mt="sm"
              {...form.getInputProps("description")}
            />

            {/* Kontaktní údaje naskládané pod sebou s nadpisem */}
            <Stack gap="xs" mt="md">
              <Text fw={600} size="sm" mb={-5}>Kontakt</Text>
              <Grid grow>
                <GridCol span={6}>
                  <TextInput
                    label={t("page.novy.nameLabel")}
                    placeholder={t("page.novy.namePlaceholder")}
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                </GridCol>
                <GridCol span={6}>
                  <TextInput
                    label={t("page.novy.emailLabel")}
                    placeholder={t("page.novy.emailPlaceholder")}
                    {...form.getInputProps("email")}
                  />
                </GridCol>
              </Grid>
              <TextInput
                label={t("page.novy.cityLabel")}
                placeholder={t("page.novy.cityPlaceholder")}
                withAsterisk
                {...form.getInputProps("city")}
              />
            </Stack>

            {/* Informační box o platbě - Zachován z detailu */}
            <Paper bg="violet.0" p="md" radius="md" mt="sm">
              <Group wrap="nowrap" align="flex-start">
                <Text c="violet" fw={700}>ⓘ</Text>
                <Stack gap={4}>
                  <Text fw={600} size="sm">Platba a předání</Text>
                  <Text size="sm" c="dimmed">
                    Platbu a předání si domluvte přímo mezi sebou — hotově nebo QR platbou.
                  </Text>
                </Stack>
              </Group>
            </Paper>

            {/* Spodní akční tlačítka namísto tlačítek rezervace */}
            <Group mt="xl">
              <Button type="submit" color="orange" loading={loading}>
                Uložit změny
              </Button>
              <Link href={`/${locale}/inzeraty/${listing.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="default">
                  Zrušit
                </Button>
              </Link>
            </Group>

          </Stack>
        </GridCol>
      </Grid>
    </form>
  );
}
