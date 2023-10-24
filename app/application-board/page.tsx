import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";

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
  });
  return cards;
};

const Job: React.FC = async () => {
  const cards = await getCardsForUser("user1@example.com");

  return <DynamicTextEditor cards={cards} />;
};

export default Job;
