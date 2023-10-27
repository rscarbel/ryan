import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { id } = await request.json();

  const cardToDelete = await prisma.applicationCard.findUnique({
    where: { id: parseInt(id) },
    include: {
      job: {
        include: {
          location: true,
          company: true,
        },
      },
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

  // Update the position index for cards that come after the deleted card in the same column (status)
  await prisma.applicationCard.updateMany({
    where: {
      status: cardToDelete.status,
      positionIndex: {
        gte: cardToDelete.positionIndex + 1,
      },
    },
    data: {
      positionIndex: {
        decrement: 1,
      },
    },
  });

  const applicationBoardId = cardToDelete.applicationBoardId;

  try {
    await prisma.applicationCard.delete({
      where: { id: parseInt(id) },
    });

    // Check if job has any other application cards.
    const otherApplicationsForJob = await prisma.applicationCard.findFirst({
      where: {
        jobId: cardToDelete.job.id,
      },
    });

    if (!otherApplicationsForJob) {
      // If no other application cards, delete the job.
      await prisma.job.delete({
        where: {
          id: cardToDelete.job.id,
        },
      });

      // Check if location has any other jobs.
      const otherJobsForLocation = await prisma.job.findFirst({
        where: {
          locationId: cardToDelete.job.location.id,
        },
      });

      if (!otherJobsForLocation) {
        // If no other jobs at that location, delete the location.
        await prisma.location.delete({
          where: {
            id: cardToDelete.job.location.id,
          },
        });
      }

      // Check if company has any other jobs.
      const otherJobsForCompany = await prisma.job.findFirst({
        where: {
          companyId: cardToDelete.job.company.id,
        },
      });

      if (!otherJobsForCompany) {
        // If no other jobs at that company, delete the company.
        await prisma.company.delete({
          where: {
            id: cardToDelete.job.company.id,
          },
        });
      }
    }

    const cards = await prisma.applicationCard.findMany({
      where: { applicationBoardId: applicationBoardId },
      include: {
        company: true,
        job: {
          include: {
            location: true,
          },
        },
      },
    });

    const formattedCards = cards.map((card) => ({
      id: card.id,
      companyName: card.company.name,
      jobTitle: card.job?.title,
      jobDescription: card.job?.description,
      payAmountCents: card.job?.payAmountCents,
      payFrequency: card.job?.payFrequency,
      currency: card.job?.currency,
      streetAddress: card.job?.location.streetAddress,
      city: card.job?.location.city,
      state: card.job?.location.state,
      postalCode: card.job?.location.postalCode,
      country: card.job?.location.country,
      applicationLink: card.applicationLink,
      applicationDate: card.applicationDate,
      index: card.positionIndex,
      notes: card.notes,
      status: card.status,
    }));

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
