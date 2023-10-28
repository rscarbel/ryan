import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

      let location = {
        id: null,
        streetAddress: streetAddress,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
      };

      if (city) {
        location = await client.location.upsert({
          where: {
            streetAddress_city_state_postalCode_country: {
              streetAddress: streetAddress,
              city: city,
              state: state,
              postalCode: postalCode,
              country: country,
            },
          },
          create: {
            streetAddress: streetAddress,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country,
          },
          update: {},
        });
      }

      const job = await client.job.upsert({
        where: {
          title: jobTitle,
          companyId: company.id,
        },
        create: {
          title: jobTitle,
          description: jobDescription,
          payAmountCents: payAmountCents,
          payFrequency: payFrequency,
          currency: currency,
          locationId: location.id,
          company: {
            connect: {
              id: company.id,
            },
          },
        },
        update: {},
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
