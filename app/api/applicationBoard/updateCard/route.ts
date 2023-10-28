import prisma from "@/services/globalPrismaClient";

export async function POST(request) {
  const {
    applicationCardId,
    boardId,
    company,
    jobTitle,
    jobDescription,
    locationId,
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
    positionIndex,
    notes,
    status,
  } = await request.json();

  const isNecessaryDataExisting = [
    applicationCardId,
    boardId,
    company.name,
    jobTitle,
    locationId && city,
  ].every((value) => !!value);

  const allLocationFieldsEmpty =
    !city && !state && !country && !streetAddress && !postalCode;

  const isLocationValid = city || allLocationFieldsEmpty;

  if (!isNecessaryDataExisting) {
    return new Response(
      JSON.stringify({
        error: "Missing necessary data",
        cards: null,
      }),
      { status: 400 }
    );
  }

  if (!isLocationValid) {
    return new Response(
      JSON.stringify({
        error:
          "Invalid location, you must provide a city if you provide any other location data",
        cards: null,
      }),
      { status: 400 }
    );
  }

  const currentCard = await prisma.applicationCard.findUnique({
    where: { id: applicationCardId },
  });

  try {
    // If the status has changed, adjust position indices accordingly
    if (currentCard.status !== status) {
      // Adjust for the old column
      await prisma.applicationCard.updateMany({
        where: {
          applicationBoardId: boardId,
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
          applicationBoardId: boardId,
        },
        data: {
          positionIndex: {
            increment: 1,
          },
        },
      });
    }

    const updatedCard = await prisma.applicationCard.update({
      where: { id: parseInt(applicationCardId) },
      data: {
        job: {
          update: {
            title: jobTitle,
            description: jobDescription,
            payAmountCents: payAmountCents,
            payFrequency: payFrequency,
            currency: currency,
            workMode: workMode,
            company: {
              update: {
                name: company.name,
              },
            },
            locationId: locationToUse,
          },
        },
        applicationLink: applicationLink,
        applicationDate: applicationDate,
        notes: notes,
        status: status,
        positionIndex: currentCard.status !== status ? 0 : positionIndex,
      },
      include: {
        job: {
          company: true,
          include: {
            location: true,
          },
        },
      },
    });

    const cards = await prisma.applicationCard.findMany({
      where: { applicationBoardId: updatedCard.applicationBoardId },
      include: {
        job: {
          company: true,
          include: {
            location: true,
          },
        },
      },
    });

    const formattedCards = cards.map((card) => ({
      cardId: card.id,
      boardId: card.applicationBoardId,
      company: {
        name: card.job.company.name,
        companyId: card.job.company.id,
      },
      job: {
        jobId: card.job.id,
        title: card.job.title,
        description: card.job.description,
        workMode: card.job.workMode,
        location: {
          locationId: card.job.location.id,
          streetAddress: card.job.location.streetAddress,
          city: card.job.location.city,
          state: card.job.location.state,
          country: card.job.location.country,
          postalCode: card.job.location.postalCode,
        },
        payAmountCents: card.job.payAmountCents,
        payFrequency: card.job.payFrequency,
        currency: card.job.currency,
      },
      index: card.positionIndex,
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
        cards: null,
      }),
      { status: 500 }
    );
  }
}
