import prisma from "@/services/globalPrismaClient";

export const getFormattedCardData = async (applicationCardId) => {
  const applicationCard = await prisma.applicationCard.findUnique({
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
    title: applicationCard.job.title,
    description: applicationCard.job.description,
    workMode: applicationCard.job.workMode,
    payAmountCents: applicationCard.job.payAmountCents,
    payFrequency: applicationCard.job.payFrequency,
    currency: applicationCard.job.currency,
    streetAddress: applicationCard.job.streetAddress || null,
    city: applicationCard.job.city || null,
    state: applicationCard.job.state || null,
    country: applicationCard.job.country || null,
    postalCode: applicationCard.job.postalCode || null,
    applicationLink: applicationCard.applicationLink,
    applicationDate: applicationCard.applicationDate,
    status: applicationCard.status,
    notes: applicationCard.notes,
  };
};

export const getFormattedCardsForBoard = async (boardId) => {
  const applicationCards = await prisma.applicationCard.findMany({
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
    boardId: card.applicationBoardId,
    company: {
      companyId: card.job.company.id,
      name: card.job.company.name,
    },
    title: card.job.title,
    description: card.job.description,
    workMode: card.job.workMode,
    payAmountCents: card.job.payAmountCents,
    payFrequency: card.job.payFrequency,
    currency: card.job.currency,
    streetAddress: card.job.streetAddress || null,
    city: card.job.city || null,
    state: card.job.state || null,
    country: card.job.country || null,
    postalCode: card.job.postalCode || null,
    applicationLink: card.applicationLink,
    applicationDate: card.applicationDate,
    status: card.status,
    notes: card.notes,
  }));
};

export const incrementCardsAfterIndex = async ({ boardId, status, index }) => {
  await prisma.applicationCard.updateMany({
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

export const decrementCardsAfterIndex = async ({ boardId, status, index }) => {
  await prisma.applicationCard.updateMany({
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

export const deleteCard = async (cardId) => {
  const cardToDelete = await prisma.applicationCard.findUnique({
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

  await prisma.applicationCard.delete({
    where: { id: cardId },
  });

  const otherApplicationsForJob = await prisma.applicationCard.findFirst({
    where: {
      jobId: job.id,
    },
  });

  if (!otherApplicationsForJob) {
    await prisma.job.delete({
      where: {
        id: job.id,
      },
    });
  }
};
