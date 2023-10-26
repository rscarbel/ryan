import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const DynamicTextEditor = dynamic(() => import("./Board"), {
  ssr: false,
  loading: () => <div>Loading board...</div>,
});

const prisma = new PrismaClient();

const getCardsForUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return [];

  const board = await prisma.applicationBoard.findFirst({
    where: { userId: user.id },
  });
  if (!board) return [];

  const cards = await prisma.applicationCard.findMany({
    where: { applicationBoardId: board.id },
    include: {
      company: true,
      job: true,
    },
    orderBy: {
      positionIndex: "asc",
    },
  });

  return cards.map((card) => ({
    id: card.id,
    companyName: card.company.name,
    index: card.positionIndex,
    jobTitle: card.job?.title,
    jobDescription: card.job?.description,
    payAmountCents: card.payAmountCents,
    payFrequency: card.payFrequency,
    applicationLink: card.applicationLink,
    applicationDate: card.applicationDate,
    notes: card.notes,
    status: card.status,
  }));
};

const Job: React.FC = async () => {
  const cards = await getCardsForUser("user1@example.com");

  return <DynamicTextEditor cards={cards} />;
};

export default Job;
