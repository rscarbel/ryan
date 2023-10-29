import prisma from "@/services/globalPrismaClient";
import { prettifyDate } from "@/app/utils";

export const getFormattedCardData = async (
  applicationCardId,
  client = prisma
) => {
  const applicationCard = await client.applicationCard.findUnique({
    where: {
      id: applicationCardId,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!applicationCard) {
    throw new Error("Application Card not found");
  }

  return {
    cardId: applicationCard.id,
    boardId: applicationCard.applicationBoardId,
    company: {
      companyId: applicationCard.job.company.id,
      name: applicationCard.job.company.name,
    },
    jobTitle: applicationCard.job.title,
    jobDescription: applicationCard.job.description,
    workMode: applicationCard.job.workMode,
    payAmountCents: applicationCard.job.payAmountCents,
    payFrequency: applicationCard.job.payFrequency,
    currency: applicationCard.job.currency,
    streetAddress: applicationCard.job.streetAddress,
    city: applicationCard.job.city,
    state: applicationCard.job.state,
    country: applicationCard.job.country,
    postalCode: applicationCard.job.postalCode,
    applicationLink: applicationCard.applicationLink,
    applicationDate: applicationCard.applicationDate,
    status: applicationCard.status,
    positionIndex: applicationCard.positionIndex,
    notes: applicationCard.notes,
  };
};

export const getFormattedCardsForBoard = async (boardId, client = prisma) => {
  const applicationCards = await client.applicationCard.findMany({
    where: {
      applicationBoardId: boardId,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      positionIndex: "asc",
    },
  });

  return applicationCards.map((card) => ({
    cardId: card.id,
    companyName: card.job.company.name,
    title: card.job.title,
    workMode: card.job.workMode,
    payAmountCents: card.job.payAmountCents,
    payFrequency: card.job.payFrequency,
    currency: card.job.currency,
    city: card.job.city,
    country: card.job.country,
    applicationLink: card.applicationLink,
    applicationDate: prettifyDate(card.applicationDate),
    status: card.status,
  }));
};

export const incrementCardsAfterIndex = async ({
  boardId,
  status,
  index,
  client = prisma,
}) => {
  await client.applicationCard.updateMany({
    where: {
      applicationBoardId: boardId,
      status: status,
      positionIndex: {
        gte: index,
      },
    },
    data: {
      positionIndex: {
        increment: 1,
      },
    },
  });
};

export const decrementCardsAfterIndex = async ({
  boardId,
  status,
  index,
  client = prisma,
}) => {
  await client.applicationCard.updateMany({
    where: {
      applicationBoardId: boardId,
      status: status,
      positionIndex: {
        gte: index,
      },
    },
    data: {
      positionIndex: {
        decrement: 1,
      },
    },
  });
};

export const deleteCard = async (cardId, client = prisma) => {
  const cardToDelete = await client.applicationCard.findUnique({
    where: {
      id: cardId,
    },
    include: {
      job: true,
    },
  });

  const job = cardToDelete.job;

  if (!cardToDelete) {
    throw new Error("Card not found");
  }

  await client.applicationCard.delete({
    where: { id: cardId },
  });

  const otherApplicationsForJob = await client.applicationCard.findFirst({
    where: {
      jobId: job.id,
    },
  });

  if (!otherApplicationsForJob) {
    await client.job.delete({
      where: {
        id: job.id,
      },
    });
  }
};
