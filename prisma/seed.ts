const {
  UserRole,
  OAuthService,
  ApplicationStatus,
  PayFrequency,
  PrismaClient,
} = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const NUM_APPLICATION_CARDS = 10;

const randomApplicationStatus = () => {
  const statuses = Object.values(ApplicationStatus);
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
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

    const job = await prisma.job.create({
      data: {
        title: faker.person.jobTitle(),
        description: faker.lorem.sentences(3),
        company: {
          connect: {
            id: company.id,
          },
        },
        location: {
          create: {
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
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
        payAmountCents: Math.round(
          faker.finance.amount(30000, 100000, 0) * 100
        ),
        payFrequency: "yearly",
        status: randomApplicationStatus(),
        applicationBoard: {
          connect: {
            id: board1.id,
          },
        },
      },
    });
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
