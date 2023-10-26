const {
  UserRole,
  OAuthService,
  ApplicationStatus,
  PayFrequency,
  WorkMode,
  PrismaClient,
} = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const { currenciesList } = require("./data/currenciesList");
const { countrySymbols } = require("./data/countrySymbols");

const getCountryCode = (country) => {
  const countrySymbol = countrySymbols[country];
  return countrySymbol || "US";
};

const getCurrencySymbol = (country) => {
  const countryCode = getCountryCode(country);
  return currenciesList[countryCode] || "USD";
};

const prisma = new PrismaClient();

const NUM_APPLICATION_CARDS = 15;

const randomApplicationStatus = () => {
  const statuses = Object.values(ApplicationStatus);
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const randomPayDetails = () => {
  const frequencies = Object.values(PayFrequency);
  const randomIndex = Math.floor(Math.random() * frequencies.length);
  const frequency = frequencies[randomIndex];

  let amount;
  switch (frequency) {
    case PayFrequency.hourly:
      amount = faker.finance.amount(15, 50, 0); // Random hourly wage between $15 and $50
      break;
    case PayFrequency.weekly:
      amount = faker.finance.amount(500, 1500, 0); // Random weekly salary
      break;
    case PayFrequency.biweekly:
      amount = faker.finance.amount(1000, 3000, 0); // Random bi-weekly salary
      break;
    case PayFrequency.monthly:
      amount = faker.finance.amount(4000, 12000, 0); // Random monthly salary
      break;
    case PayFrequency.yearly:
      amount = faker.finance.amount(50000, 120000, 0); // Random yearly salary
      break;
    default:
      amount = 0;
  }

  return {
    frequency,
    amountCents: Math.round(amount * 100),
  };
};

const randomWorkMode = () => {
  const modes = Object.values(WorkMode);
  const randomIndex = Math.floor(Math.random() * modes.length);
  return modes[randomIndex];
};

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      passwordHash: "hashedPassword1",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      roles: [UserRole.USER],
    },
  });

  await prisma.oAuth.create({
    data: {
      userId: user1.id,
      provider: OAuthService.GOOGLE,
      externalId: "externalId1",
    },
  });

  const board1 = await prisma.applicationBoard.create({
    data: {
      name: "Job Applications",
      userId: user1.id,
    },
  });

  const statusIndices = Object.values(ApplicationStatus).reduce(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {}
  );

  for (let i = 0; i < NUM_APPLICATION_CARDS; i++) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        user: {
          connect: {
            id: user1.id,
          },
        },
      },
    });

    const currentStatus = randomApplicationStatus();
    const { frequency, amountCents } = randomPayDetails();
    const country = faker.location.country();

    const job = await prisma.job.create({
      data: {
        title: faker.person.jobTitle(),
        description: faker.lorem.sentences(3),
        workMode: randomWorkMode(),
        company: {
          connect: {
            id: company.id,
          },
        },
        payAmountCents: amountCents,
        payFrequency: frequency,
        currency: country,
        location: {
          create: {
            city: faker.location.city(),
            state: faker.location.state(),
            country: country,
            postalCode: faker.location.zipCode(),
          },
        },
      },
    });

    await prisma.applicationCard.create({
      data: {
        applicationDate: faker.date.past({
          years: 1,
          refDate: new Date(),
        }),
        applicationLink: faker.internet.url(),
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
        notes: faker.lorem.paragraph(),
        status: currentStatus,
        positionIndex: statusIndices[currentStatus],
        applicationBoard: {
          connect: {
            id: board1.id,
          },
        },
      },
    });

    statusIndices[currentStatus] += 1;
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
