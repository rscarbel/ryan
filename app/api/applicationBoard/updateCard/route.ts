import prisma from "@/services/globalPrismaClient";
import {
  decrementCardsAfterIndex,
  incrementCardsAfterIndex,
  getFormattedCardsForBoard,
} from "@/services/ApplicationCard/applicationCardService";
import { updateCompany } from "@/services/Company/companyService";
import { updateJob } from "@/services/Job/jobService";

export async function POST(request) {
  const {
    applicationCardId,
    boardId,
    company,
    jobId,
    jobTitle,
    jobDescription,
    workMode,
    payAmountCents,
    payFrequency,
    currency,
    streetAddress,
    city,
    state,
    country,
    postalCode,
    applicationLink,
    applicationDate,
    notes,
    status,
  } = await request.json();

  const isNecessaryDataExisting = [
    applicationCardId,
    boardId,
    company.name,
    jobTitle,
  ].every((value) => !!value);

  if (!isNecessaryDataExisting) {
    return new Response(
      JSON.stringify({
        error: "Missing necessary data",
        cards: null,
      }),
      { status: 400 }
    );
  }

  const currentCard = await prisma.applicationCard.findUnique({
    where: { id: applicationCardId },
  });

  try {
    let currentIndex = currentCard.positionIndex;
    // If the status has changed, adjust position indices accordingly
    if (currentCard.status !== status) {
      const indexToDecrement = currentIndex + 1;
      currentIndex = 0;
      // Adjust for the old column
      await decrementCardsAfterIndex({
        status: currentCard.status,
        index: indexToDecrement,
        boardId: boardId,
      });

      // Adjust for the new column (move everything down)
      await incrementCardsAfterIndex({
        status: status,
        index: currentIndex,
        boardId: boardId,
      });
    }

    await updateCompany({
      companyName: company.name,
      companyId: company.companyId,
    });

    await updateJob({
      jobId: jobId,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      workMode: workMode,
      payAmountCents: payAmountCents,
      payFrequency: payFrequency,
      currency: currency,
      streetAddress: streetAddress,
      city: city,
      state: state,
      country: country,
      postalCode: postalCode,
    });

    await prisma.applicationCard.update({
      where: { id: applicationCardId },
      data: {
        applicationLink: applicationLink,
        applicationDate: applicationDate,
        positionIndex: currentIndex,
        notes: notes,
        status: status,
      },
    });

    const formattedCards = await getFormattedCardsForBoard(boardId);

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
