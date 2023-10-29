import prisma from "@/services/globalPrismaClient";

export async function POST(request) {
  const {
    status,
    jobTitle,
    companyName,
    payAmountCents,
    payFrequency,
    jobDescription,
    currency,
    streetAddress,
    city,
    state,
    postalCode,
    country,
    applicationLink,
    workMode,
    applicationDate,
    positionIndex,
    notes,
  } = await request.json();
  try {
    await prisma.$transaction(async (client) => {
      await client.applicationCard.updateMany({
        where: {
          status: status,
        },
        data: {
          positionIndex: {
            increment: 1,
          },
        },
      });

      const company = await client.company.create({
        data: {
          name: companyName,
          userId: 1,
        },
      });

      const locationData = city
        ? {
            location: {
              create: {
                city: city,
                state: state,
                country: country,
                streetAddress: streetAddress,
                postalCode: postalCode,
              },
            },
          }
        : {};

      const existingJob = await client.job.findUnique({
        where: {
          title_companyId_workMode: {
            title: jobTitle,
            companyId: company.id,
            workMode: workMode,
          },
        },
      });

      const job = existingJob
        ? existingJob
        : await client.job.create({
            data: {
              title: jobTitle,
              description: jobDescription,
              workMode: workMode,
              company: {
                connect: {
                  id: company.id,
                },
              },
              payAmountCents: payAmountCents,
              payFrequency: payFrequency,
              currency: currency,
              user: {
                connect: {
                  id: 1,
                },
              },
              ...locationData,
            },
          });

      const card = await client.applicationCard.create({
        data: {
          applicationBoard: {
            connect: {
              id: "1",
            },
          },
          company: {
            connect: {
              id: company.id,
            },
          },
          job: {
            connect: {
              id: job.id,
            },
          },
          applicationLink: applicationLink,
          applicationDate: applicationDate,
          notes: notes,
          status: status,
          positionIndex: positionIndex,
        },
      });

      return card;
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/application-board",
      },
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
