export interface ApplicationCardInterface {
  cardId: number;
  boardId: number;
  companyName: string;
  title: string;
  payAmount: number;
  payFrequency: string;
  currency: string;
  workMode: string;
  city: string;
  country: string;
  applicationLink?: string;
  applicationDate: string;
  status: string;
  index: number;
}

export interface BoardCardInterface
  extends Omit<ApplicationCardInterface, "index"> {}
