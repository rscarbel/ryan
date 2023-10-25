import { revalidatePath } from "next/cache";

export const updateCardStatus = async (cardId: string, newStatus: string) => {
  const response = await fetch("/api/applicationBoard/updateStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: cardId,
      status: newStatus,
    }),
  });

  const data = await response.json();
  return { response, data };
};

export const updateCard = async (card) => {
  const response = await fetch("/api/applicationBoard/updateCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  const data = await response.json();
  return { response, data };
};
