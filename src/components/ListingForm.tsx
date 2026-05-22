"use client";

import { Button, Checkbox, Group, NumberInput, Paper, Select, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { createInzerat } from "@/app/actions";

export function ListingForm() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      city: "",
      category: "", // Stores index as string: "0", "1", etc.
      price: 0,
      isFree: false,
      name: "",
      email: "",
      status: "", // Stores index as string: "0", "1", etc.
      imageUrl: "",
    },
    validate: {
      title: (value) => (value.trim().length === 0 ? "Název je povinný" : null),
      description: (value) => (value.trim().length === 0 ? "Popis je povinný" : null),
      city: (value) => (value.trim().length === 0 ? "Město je povinné" : null),
      category: (value) => (value === "" ? "Vyberte kategorii" : null),
      name: (value) => (value.trim().length === 0 ? "Jméno je povinné" : null),
      status: (value) => (value === "" ? "Vyberte stav nabídky" : null),
      price: (value, values) => (!values.isFree && (value === undefined || value < 0) ? "Zadejte platnou cenu" : null),
      email: (value) => (value && !/^\S+@\S+\.\S+$/.test(value) ? "Neplatný formát e-mailu" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await createInzerat(values);
    } catch (error) {
      console.error("Submission failed:", error);
      setLoading(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      shadow="xs"
      radius="lg"
      withBorder
      p="md"
      mx="auto"
      w="100%"
    >
      <TextInput label={t("page.novy.titleLabel")} withAsterisk pb="md" {...form.getInputProps("title")} />

      <Textarea
        label={t("page.novy.descriptionLabel")}
        withAsterisk
        autosize
        pb="md"
        minRows={2}
        {...form.getInputProps("description")}
      />

      <TextInput label={t("page.novy.cityLabel")} withAsterisk pb="md" {...form.getInputProps("city")} />

      <Select
        label={t("page.novy.categoryLabel")}
        withAsterisk
        pb="xs"
        // Mapping translated labels to index values
        data={[
          { value: "0", label: t("page.novy.category1") },
          { value: "1", label: t("page.novy.category2") },
          { value: "2", label: t("page.novy.category3") },
          { value: "3", label: t("page.novy.category4") },
          { value: "4", label: t("page.novy.category5") },
        ]}
        {...form.getInputProps("category")}
      />

      <Group justify="space-between" align="end" mt="md" grow>
        <NumberInput
          label={t("page.novy.priceLabel")}
          withAsterisk={!form.values.isFree}
          suffix=" Kč"
          disabled={form.values.isFree}
          value={form.values.isFree ? 0 : form.values.price}
          onChange={(val) => form.setFieldValue("price", Number(val))}
        />
        <Checkbox
          label={t("page.novy.freeLabel")}
          color="orange"
          {...form.getInputProps("isFree", { type: "checkbox" })}
          onChange={(event) => {
            const checked = event.currentTarget.checked;
            form.setFieldValue("isFree", checked);
            if (checked) form.setFieldValue("price", 0); // Sets price to 0 immediately
          }}
        />
      </Group>

      <Group justify="space-between" grow mt="md" pb="xs">
        <TextInput label={t("page.novy.nameLabel")} withAsterisk {...form.getInputProps("name")} />
        <TextInput label={t("page.novy.emailLabel")} {...form.getInputProps("email")} />
      </Group>

      <Select
        label={t("page.novy.statusLabel")}
        withAsterisk
        pb="md"
        data={[
          { value: "0", label: t("page.novy.status1") },
          { value: "1", label: t("page.novy.status2") },
          { value: "2", label: t("page.novy.status3") },
        ]}
        {...form.getInputProps("status")}
      />

      <TextInput label={t("page.novy.imageUrlLabel")} pb="md" {...form.getInputProps("imageUrl")} />

      <Button type="submit" mt="md" color="orange" fullWidth loading={loading}>
        {t("page.novy.submitButton")}
      </Button>
    </Paper>
  );
}
