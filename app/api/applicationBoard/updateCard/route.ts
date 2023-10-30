import prisma from "@/services/globalPrismaClient";
import {
  decrementCardsAfterIndex,
  incrementCardsAfterIndex,
  getFormattedCardsForBoard,
} from "@/services/ApplicationCard/applicationCardService";
import { updateCompany } from "@/services/Company/companyService";
import { updateJob } from "@/services/Job/jobService";
import { calculateBoardStructure } from "../calculateBoardStructure";

export async function POST(request: Request) {
  const {
    cardId,
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

  const necessaryData = {
    "Application Card": cardId,
    Board: boardId,
    "Company Name": company.name,
    "Job Title": jobTitle,
  };

  const dataMissing = Object.keys(necessaryData).filter(
    (key) => !necessaryData[key]
  );

  if (dataMissing.length) {
    return new Response(
      JSON.stringify({
        error: `Request is missing ${dataMissing.join(", ")}`,
      }),
      { status: 400 }
    );
  }

  const currentCard = await prisma.applicationCard.findUnique({
    where: { id: cardId },
  });

  try {
    await prisma.$transaction(async (pris) => {
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
          client: pris,
        });

        // Adjust for the new column (move everything down)
        await incrementCardsAfterIndex({
          status: status,
          index: currentIndex,
          boardId: boardId,
          client: pris,
        });
      }

      await updateCompany({
        companyName: company.name,
        companyId: company.companyId,
        client: pris,
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
        client: pris,
      });

      await pris.applicationCard.update({
        where: { id: cardId },
        data: {
          applicationLink: applicationLink,
          applicationDate: applicationDate,
          positionIndex: currentIndex,
          notes: notes,
          status: status,
        },
      });
    });
    const formattedCards = await getFormattedCardsForBoard(boardId);
    const board = calculateBoardStructure(formattedCards);

    return new Response(JSON.stringify({ board }), {
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
