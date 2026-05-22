"use client";

import { Button, Group } from "@mantine/core";
import { useState } from "react";
import { updateListingStatus } from "@/app/actions";

interface ListingActionButtonsProps {
  listingId: number;
  currentStatus: number;
}

export function ListingActionButtons({ listingId, currentStatus }: ListingActionButtonsProps) {
  const [loading, setLoading] = useState<number | null>(null);

  const handleUpdate = async (newStatus: number) => {
    setLoading(newStatus);
    await updateListingStatus(listingId, newStatus);
    setLoading(null);
  };

  // Pokud je již prodáno, tlačítka neukazujeme nebo je můžeme deaktivovat
  if (currentStatus === 2) return null;

  return (
    <Group mt="xl">
      {currentStatus !== 1 && (
        <Button
          color="orange"
          onClick={() => handleUpdate(1)}
          loading={loading === 1}
        >
          Rezervovat
        </Button>
      )}

      <Button
        variant="default"
        onClick={() => handleUpdate(2)}
        loading={loading === 2}
      >
        Označit jako prodáno
      </Button>

      {currentStatus !== 0 && (
        <Button
          variant="subtle"
          color="gray"
          size="xs"
          onClick={() => handleUpdate(0)}
          loading={loading === 0}
        >
          Zrušit status
        </Button>
      )}
    </Group>
  );
}
