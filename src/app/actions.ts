"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { items } from "@/db/schemas/item-schemas.schema";

export async function createInzerat(values: any) {
  // Convert string indices from the Select components to integers for the DB
  const categoryID = parseInt(values.category, 10);
  const statusID = parseInt(values.status, 10);

  // Ensure price is 0 if 'isFree' was toggled, otherwise use the number input
  const finalPrice = values.isFree ? 0 : values.price || 0;

  // Insert into SQLite using the schema columns
  await db.insert(items).values({
    title: values.title,
    description: values.description,
    city: values.city,
    category: categoryID, // Saved as integer index
    price: finalPrice,
    createdByName: values.name,
    createdByEmail: values.email,
    status: statusID, // Saved as integer index
    imageUrl: values.imageUrl,
  });

  // Refresh the listings page and go back
  revalidatePath("/[locale]/inzeraty");
  redirect("/cs/inzeraty");
}
