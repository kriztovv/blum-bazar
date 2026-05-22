import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { items } from "@/db/schemas/item-schemas.schema";
import { EditListingForm } from "./EditListingForm";

export default async function EditListingPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const resolvedParams = await params;
  const listingId = parseInt(resolvedParams.id, 10);

  if (isNaN(listingId)) {
    notFound();
  }

  const listingResult = await db.select().from(items).where(eq(items.id, listingId));

  if (listingResult.length === 0) {
    notFound();
  }

  const listing = listingResult[0];

  return <EditListingForm listing={listing} locale={resolvedParams.locale} />;
}
