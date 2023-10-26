import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { id, status, newPositionIndex } = await request.json();

  const currentCard = await prisma.applicationCard.findUnique({
    where: { id: parseInt(id) },
  });

  // Check if the card is moved within the same column or to a new column
  if (currentCard.status === status) {
    // Moved within the same column
    if (currentCard.positionIndex < newPositionIndex) {
      // Moved down
      await prisma.applicationCard.updateMany({
        where: {
          status: status,
          positionIndex: {
            gte: currentCard.positionIndex + 1,
            lte: newPositionIndex,
          },
        },
        data: {
          positionIndex: {
            decrement: 1,
          },
        },
      });
    } else if (currentCard.positionIndex > newPositionIndex) {
      // Moved up
      await prisma.applicationCard.updateMany({
        where: {
          status: status,
          positionIndex: {
            lte: currentCard.positionIndex - 1,
            gte: newPositionIndex,
          },
        },
        data: {
          positionIndex: {
            increment: 1,
          },
        },
      });
    }
  } else {
    // Moved to a new column
    // Decrease position indices in the old column
    await prisma.applicationCard.updateMany({
      where: {
        status: currentCard.status,
        positionIndex: {
          gte: currentCard.positionIndex + 1,
        },
      },
      data: {
        positionIndex: {
          decrement: 1,
        },
      },
    });

    // Increase position indices in the new column
    await prisma.applicationCard.updateMany({
      where: {
        status: status,
        positionIndex: {
          gte: newPositionIndex,
        },
      },
      data: {
        positionIndex: {
          increment: 1,
        },
      },
    });
  }

  try {
    const updatedCard = await prisma.applicationCard.update({
      where: { id: parseInt(id) },
      data: { status: status, positionIndex: newPositionIndex },
    });
    return new Response(JSON.stringify({ error: null, card: updatedCard }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        cards: null,
      }),
      { status: 500 }
    );
  }
}
