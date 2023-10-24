import dynamic from "next/dynamic";
import dummyData from "./dummyData";

const DynamicTextEditor = dynamic(() => import("./Board"), {
  ssr: false,
  loading: () => <div>Loading board...</div>,
});

const Job: React.FC = () => {
  return <DynamicTextEditor data={dummyData} />;
};

export default Job;
