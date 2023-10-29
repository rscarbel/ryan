export interface ApplicationCardInterface {
  cardId: number;
  boardId: number;
  company: {
    companyId: number;
    name: string;
  };
  jobId: number;
  title: string;
  description?: string;
  payAmountCents: number;
  payFrequency: string;
  currency?: string;
  workMode: string;
  streetAddress?: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  applicationLink?: string;
  applicationDate: Date;
  notes?: string;
  status: string;
  index: number;
}

export interface BoardCardInterface
  extends Omit<ApplicationCardInterface, "index"> {}
