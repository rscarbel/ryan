import { MAX_CHARACTERS, truncateText } from "./utils";

const Description: React.FC<{
  description: string;
  isExpanded: boolean;
  toggle: () => void;
}> = ({ description, isExpanded, toggle }) => (
  <div className="mb-2 text-sm text-gray-500">
    {isExpanded ? description : truncateText(description)}
    {description?.length > MAX_CHARACTERS && (
      <span className="text-blue-500 cursor-pointer" onClick={toggle}>
        {isExpanded ? " see less" : " see more..."}
      </span>
    )}
  </div>
);

export default Description;
