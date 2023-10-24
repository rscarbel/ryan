interface ColumnType {
  id: string;
  title: string;
  applicationCardIds: string[];
}

export const columns: ColumnType[] = [
  { id: "applied", title: "Applied", applicationCardIds: [] },
  { id: "interview", title: "Interview", applicationCardIds: [] },
  { id: "offer", title: "Offer", applicationCardIds: [] },
  { id: "rejected", title: "Rejected", applicationCardIds: [] },
  { id: "passed", title: "Passed", applicationCardIds: [] },
  { id: "accepted", title: "Accepted", applicationCardIds: [] },
];

export const columnOrder = [
  "applied",
  "interview",
  "offer",
  "rejected",
  "accepted",
  "passed",
];
