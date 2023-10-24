const dummyData = {
  applicationCards: {
    "application-1": {
      id: "application-1",
      companyName: "Tech Corp",
      jobTitle: "Frontend Developer",
      jobDescription: "Develop and maintain the company website.",
      salary: "$70,000",
      applicationLink: "http://techcorp.com/jobs/frontend",
      notes: "Need to follow up next week.",
    },
    "application-2": {
      id: "application-2",
      companyName: "HealthSoft",
      jobTitle: "Backend Developer",
      jobDescription: "Work on our main product API.",
      salary: "$80,000",
      applicationLink: "http://healthsoft.com/jobs/backend",
      notes: "Interview scheduled for Monday.",
    },
  },
  columns: {
    "application-column": {
      id: "application-column",
      title: "Applied",
      applicationCardIds: ["application-1", "application-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Interview",
      applicationCardIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Offer",
      applicationCardIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Rejected",
      applicationCardIds: [],
    },
  },
  columnOrder: ["application-column", "column-2", "column-3", "column-4"],
};

export default dummyData;
