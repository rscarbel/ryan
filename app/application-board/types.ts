export interface ApplicationCardInterface {
  id: number;
  companyName: string;
  jobTitle?: string;
  jobDescription?: string;
  payAmountCents?: number;
  payFrequency?: string;
  applicationLink?: string;
  applicationDate?: Date;
  notes?: string;
  status: string;
  index: number;
}

export interface BoardCardInterface
  extends Omit<ApplicationCardInterface, "index"> {}