import dynamic from "next/dynamic";
import prisma from "@/services/globalPrismaClient";
import { getFormattedCardsForBoard } from "@/services/ApplicationCard/applicationCardService";
import BoardSkeleton from "./boardSkeleton";
import TopMenu from "../TopMenu";
import "primereact/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";

const DynamicTextEditor = dynamic(() => import("./Board"), {
  ssr: false,
  loading: () => <BoardSkeleton />,
});

const getCardsForUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return [];

  const board = await prisma.applicationBoard.findFirst({
    where: { userId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!board) return [];

  const cards = await getFormattedCardsForBoard(board.id);

  return cards;
};

const Job: React.FC = async () => {
  const cards = await getCardsForUser("user1@example.com");

  return (
    <>
      <TopMenu />
      <DynamicTextEditor cards={cards} />
    </>
  );
};

export default Job;
