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
    const jobData = {
      title: jobTitle,
      payAmountCents: payAmountCents,
      payFrequency: payFrequency,
    };

    if (jobDescription) jobData.description = jobDescription;
    if (currency) jobData.currency = currency;

    const locationData = {};
    if (streetAddress) locationData.streetAddress = streetAddress;
    if (city) locationData.city = city;
    if (state) locationData.state = state;
    if (postalCode) locationData.postalCode = postalCode;
    if (country) locationData.country = country;

    if (Object.keys(locationData).length > 0) {
      jobData.location = { create: locationData };
    }

    const cardData = {
      job: { create: jobData },
      status: status,
      positionIndex: 0,
    };

    if (applicationLink) cardData.applicationLink = applicationLink;
    if (applicationDate) cardData.applicationDate = applicationDate;
    if (notes) cardData.notes = notes;

    console.log("cardData", cardData);
    const existingCardsWithStatus = await prisma.applicationCard.findMany({
      where: { status: status },
    });
    console.log("existingCardsWithStatus", existingCardsWithStatus.length);

    let transactionQueries = [];

    if (existingCardsWithStatus.length) {
      transactionQueries.push(
        prisma.applicationCard.updateMany({
          where: {
            status: status,
          },
          data: {
            positionIndex: {
              increment: 1,
            },
          },
        })
      );
    }
    console.log("transactionQueries", transactionQueries.length);

    transactionQueries.push(
      prisma.applicationCard.create({
        data: {
          ...cardData,
          company: companyName ? { create: { name: companyName } } : undefined,
        },
        include: {
          company: true,
          job: {
            include: {
              location: true,
            },
          },
        },
      })
    );

    const newCard = await prisma.$transaction([
      prisma.applicationCard.updateMany({
        where: {
          status: status,
        },
        data: {
          positionIndex: {
            increment: 1,
          },
        },
      }),
      prisma.applicationCard.create({
        data: {
          ...cardData,
          company: { create: { name: companyName } },
          job: { create: jobData },
        },
        include: {
          company: true,
          job: {
            name: true,
            include: {
              location: true,
            },
          },
        },
      }),
    ]);

    console.log("newCard", newCard);

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
