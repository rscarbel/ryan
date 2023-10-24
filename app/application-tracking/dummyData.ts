const dummyData = {
  applicationCards: {
    "task-1": {
      id: "task-1",
      companyName: "Tech Corp",
      jobTitle: "Frontend Developer",
      jobDescription: "Develop and maintain the company website.",
      salary: "$70,000",
      applicationLink: "http://techcorp.com/jobs/frontend",
      notes: "Need to follow up next week.",
    },
    "task-2": {
      id: "task-2",
      companyName: "HealthSoft",
      jobTitle: "Backend Developer",
      jobDescription: "Work on our main product API.",
      salary: "$80,000",
      applicationLink: "http://healthsoft.com/jobs/backend",
      notes: "Interview scheduled for Monday.",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Applied",
      applicationCardIds: ["task-1", "task-2"],
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
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default dummyData;
