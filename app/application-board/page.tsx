import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
import BoardSkeleton from "./boardSkeleton";
import TopMenu from "./TopMenu";
import "primereact/resources/themes/viva-light/theme.css";

const DynamicTextEditor = dynamic(() => import("./Board"), {
  ssr: false,
  loading: () => <BoardSkeleton />,
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
      job: {
        include: {
          location: true,
        },
      },
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
    workMode: card.job?.workMode,
    streetAddress: card.job?.location?.streetAddress,
    city: card.job?.location?.city,
    state: card.job?.location?.state,
    country: card.job?.location?.country,
    postalCode: card.job?.location?.postalCode,
    payAmountCents: card.job?.payAmountCents,
    payFrequency: card.job?.payFrequency,
    currency: card.job?.currency,
    applicationLink: card.applicationLink,
    applicationDate: card.applicationDate,
    notes: card.notes,
    status: card.status,
  }));
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
