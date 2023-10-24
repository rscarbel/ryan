import SingleColumn from "./SingleColumn";

const DoubleColumn = ({
  column1,
  column2,
  applicationCards1,
  applicationCards2,
}) => (
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex flex-col">
    <SingleColumn
      column={column1}
      applicationCards={applicationCards1}
      isFullSizeOnly={true}
    />
    <SingleColumn
      column={column2}
      applicationCards={applicationCards2}
      isFullSizeOnly={true}
    />
  </div>
);

export default DoubleColumn;
