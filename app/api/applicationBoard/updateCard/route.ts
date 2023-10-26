import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  const {
    id,
    status,
    jobTitle,
    jobDescription,
    payAmountCents,
    payFrequency,
    applicationLink,
    applicationDate,
    notes,
  } = await request.json();

  const currentCard = await prisma.applicationCard.findUnique({
    where: { id: parseInt(id) },
  });

  // If the status has changed, adjust position indices accordingly
  if (currentCard.status !== status) {
    // Adjust for the old column
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

    // Adjust for the new column (move everything down)
    await prisma.applicationCard.updateMany({
      where: {
        status: status,
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
      data: {
        job: {
          update: {
            title: jobTitle,
            description: jobDescription,
          },
        },
        payAmountCents: payAmountCents,
        payFrequency: payFrequency,
        applicationLink: applicationLink,
        applicationDate: applicationDate,
        notes: notes,
        status: status,
        positionIndex:
          currentCard.status !== status ? 0 : currentCard.positionIndex,
      },
      include: {
        company: true,
        job: true,
      },
    });

    const cards = await prisma.applicationCard.findMany({
      where: { applicationBoardId: updatedCard.applicationBoardId },
      include: {
        company: true,
        job: true,
      },
    });

    const formattedCards = cards.map((card) => ({
      id: card.id,
      companyName: card.company.name,
      jobTitle: card.job?.title,
      jobDescription: card.job?.description,
      payAmountCents: card.payAmountCents,
      payFrequency: card.payFrequency,
      applicationLink: card.applicationLink,
      applicationDate: card.applicationDate,
      index: card.positionIndex,
      notes: card.notes,
      status: card.status,
    }));

    return new Response(
      JSON.stringify({ error: null, cards: formattedCards }),
      {
        status: 200,
      }
    );
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
