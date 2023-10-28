export interface ApplicationCardInterface {
  id: number;
  company: {
    id: number;
    name: string;
  };
  job: {
    id: number;
    title: string;
    description?: string;
    payAmountCents: number;
    payFrequency: string;
    currency?: string;
    workMode: string;
    location?: {
      id: number;
      streetAddress?: string;
      city: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
  applicationLink?: string;
  applicationDate: Date;
  notes?: string;
  status: string;
  index: number;
}

export interface BoardCardInterface
  extends Omit<ApplicationCardInterface, "index"> {}
