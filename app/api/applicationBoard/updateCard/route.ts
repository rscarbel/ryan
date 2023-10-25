import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  const res = await request.json();
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
  } = res;

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
        card: null,
      }),
      { status: 500 }
    );
  }
}

