import {
  ApplicationStatus,
  Job,
  ApplicationBoard,
  Email,
} from "@prisma/client";
import prisma from "@/services/globalPrismaClient";

class ApplicationCard {
  id: number;
  applicationDate: Date;
  applicationLink: string;
  job: Job;
  jobId: number;
  positionIndex: number;
  notes: string | null;
  user: any;
  userId: number;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
  applicationBoard: ApplicationBoard;
  applicationBoardId: number;

  constructor(data: Partial<ApplicationCard>) {
    this.id = data.id || 0;
    this.applicationDate = data.applicationDate;
    this.applicationLink = data.applicationLink;
    this.job = data.job;
    this.jobId = data.jobId;
    this.positionIndex = data.positionIndex;
    this.notes = data.notes;
    this.user = data.user;
    this.userId = data.userId;
    this.status = data.status || ApplicationStatus.applied;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.applicationBoard = data.applicationBoard;
    this.applicationBoardId = data.applicationBoardId;
  }

  save(): ApplicationCard {
    // applicationCardService.create(this);
  }

  updateStatus(newStatus: ApplicationStatus): string {
    // applicationCardService.updateStatus(this, newStatus);
    this.status = newStatus;
  }

  // Add a note to the application card
  addNote(note: string): void {
    // applicationCardService.addNote(this, note);
    this.notes = note;
  }

  // Link a job to the application card
  linkJob(jobId: number): Job {
    const linkedJob = applicationCardService.linkJob(this, jobId);
    this.jobId = jobId;
    this.job = linkedJob;
    return linkedJob;
  }

  archive(): void {
    // applicationCardService.archive(this);
    this.status = ApplicationStatus.passed;
  }

  // Move this application card to a different board
  moveToBoard(boardId: number): void {
    // applicationCardService.moveToBoard(this, boardId);
    this.applicationBoardId = boardId;
    // Optionally, if you want to update the whole `applicationBoard` reference:
    // this.applicationBoard = boardService.getBoardById(boardId); // Fetch the actual ApplicationBoard object
  }

  // Perhaps a method to retrieve related emails for this application (assuming an email model/service exists)
  getEmails(): Email[] {
    // return emailService.getEmailsForApplicationCard(this.id);
  }

  // More methods as you see fit...
}

export default ApplicationCard;
