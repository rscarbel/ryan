export const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "bg-blue-200";
    case "interview":
      return "bg-green-300";
    case "offer":
      return "bg-blue-700 text-slate-50";
    case "rejected":
      return "bg-red-700 text-slate-50";
    case "passed":
      return "bg-black text-slate-50";
    case "accepted":
      return "bg-green-700 text-slate-50";
    default:
      return "bg-gray-200";
  }
};
