import {
  PrismaClient,
  UserRole,
  OAuthService,
  SiteContentFormat,
  ApplicationStatus,
} from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();
const NUM_APPLICATION_CARDS = 10;

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
    await prisma.applicationCard.create({
      data: {
        applicationDate: faker.date.past(2),
        applicationLink: faker.internet.url(),
        companyName: faker.company.companyName(),
        jobDescription: faker.lorem.sentences(3),
        jobTitle: faker.person.jobTitle(),
        notes: faker.lorem.paragraph(),
        salary: faker.finance.amount(30000, 100000, 0),
        status: faker.random.arrayElement(Object.values(ApplicationStatus)),
        applicationBoardId: board1.id,
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
