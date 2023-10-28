import { prettifyDate } from "@/app/utils";
import prisma from "@/services/globalPrismaClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get("userId"));
  const companyId = parseInt(searchParams.get("companyId"));
  const jobTitle = searchParams.get("jobTitle");
  const boardId = parseInt(searchParams.get("boardId"));

  if (!userId || isNaN(userId)) {
    return Response.json({
      status: 400,
      body: { error: "Invalid userId" },
    });
  }

  if (!companyId || isNaN(companyId)) {
    return Response.json({
      status: 400,
      body: { error: "Invalid userId" },
    });
  }

  if (!jobTitle) {
    return Response.json({
      status: 400,
      body: { error: "Invalid jobTitle" },
    });
  }

  if (!boardId || isNaN(boardId)) {
    return Response.json({
      status: 400,
      body: { error: "Invalid boardId" },
    });
  }

  const job = await prisma.job.findFirst({
    where: {
      title: jobTitle,
      companyId: companyId,
      userId: userId,
    },
    select: {
      id: true,
      title: true,
    },
  });

  const lastApplicationToJobInOtherBoard =
    await prisma.applicationCard.findFirst({
      where: {
        jobId: job.id,
        applicationBoardId: {
          not: boardId,
        },
      },
      orderBy: {
        applicationDate: "desc",
      },
      select: {
        applicationDate: true,
        applicationBoard: {
          select: {
            name: true,
          },
        },
      },
    });

  const lastApplicationToJobInThisBoard =
    await prisma.applicationCard.findFirst({
      where: {
        jobId: job.id,
        applicationBoardId: boardId,
      },
      orderBy: {
        applicationDate: "desc",
      },
      select: {
        applicationDate: true,
      },
    });

  const payload = {
    jobTitle: jobTitle,
    lastApplicationToJobInThisBoard: prettifyDate(
      lastApplicationToJobInThisBoard?.applicationDate
    ),
    lastApplicationToJobInOtherBoard: {
      date: prettifyDate(lastApplicationToJobInOtherBoard?.applicationDate),
      boardName: lastApplicationToJobInOtherBoard?.applicationBoard.name,
    },
  };

  return Response.json({
    body: payload,
  });
}
