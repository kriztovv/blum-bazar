"use server";

import { eq } from "drizzle-orm"; // <-- TENTO IMPORT JE ZÁSADNÍ PRO ÚPRAVY
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { items } from "@/db/schemas/item-schemas.schema";

// Původní funkce pro vytvoření (zůstává beze změny)
export async function createInzerat(values: any) {
  const categoryID = parseInt(values.category, 10);
  const statusID = parseInt(values.status, 10);
  const finalPrice = values.isFree ? 0 : values.price || 0;

  await db.insert(items).values({
    title: values.title,
    description: values.description,
    city: values.city,
    categoryID: categoryID,
    price: finalPrice,
    createdByName: values.name,
    createdByEmail: values.email,
    statusID: statusID,
    imageUrl: values.imageUrl,
  });

  revalidatePath("/[locale]/inzeraty");
  redirect("/cs/inzeraty");
}

// NOVÁ FUNKCE PRO ÚPRAVU INZERÁTU
export async function updateInzerat(id: number, values: any) {
  const categoryID = parseInt(values.category, 10);
  const statusID = parseInt(values.status, 10);
  const finalPrice = values.isFree ? 0 : values.price || 0;

  await db
    .update(items)
    .set({
      title: values.title,
      description: values.description,
      city: values.city,
      categoryID: categoryID,
      price: finalPrice,
      createdByName: values.name,
      createdByEmail: values.email,
      statusID: statusID,
      imageUrl: values.imageUrl,
    })
    .where(eq(items.id, id)); // Najde inzerát podle ID a přepíše ho

  // Vymaže cache, aby se změny na webu projevily okamžitě
  revalidatePath("/[locale]/inzeraty", "layout");

  return { success: true };
}

export async function updateListingStatus(id: number, newStatusId: number) {
  try {
    await db.update(items)
      .set({ statusID: newStatusId })
      .where(eq(items.id, id));

    revalidatePath("/[locale]/inzeraty/[id]", "page");
    revalidatePath("/[locale]/inzeraty", "page");
    return { success: true };
  } catch (error) {
    console.error("Chyba při aktualizaci stavu:", error);
    return { success: false };
  }
}
