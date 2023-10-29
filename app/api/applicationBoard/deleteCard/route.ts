import prisma from "@/services/globalPrismaClient";
import {
  decrementCardsAfterIndex,
  deleteCard,
  getFormattedCardsForBoard,
} from "@/services/ApplicationCard/applicationCardService";

export async function POST(request) {
  const { id } = await request.json();

  const cardToDelete = await prisma.applicationCard.findUnique({
    where: { id: parseInt(id) },
    include: {
      job: true,
    },
  });

  if (!cardToDelete) {
    return new Response(
      JSON.stringify({
        error: "Card not found.",
      }),
      { status: 404 }
    );
  }

  const indexToDecrement = cardToDelete.positionIndex + 1;
  const applicationBoardId = cardToDelete.applicationBoardId;

  try {
    await prisma.$transaction(async (pris) => {
      await decrementCardsAfterIndex({
        status: cardToDelete.status,
        index: indexToDecrement,
        boardId: applicationBoardId,
        client: pris,
      });
      await deleteCard(parseInt(id), pris);
    });
    const formattedCards = await getFormattedCardsForBoard(applicationBoardId);

    return new Response(JSON.stringify({ cards: formattedCards }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
