import { FC } from "react";
import ExistingContent from "./existingContent";
import NewContentInput from "./newContentInput";
import fetchContentByKey from "./fetchContentByKey";

interface UserDefinedContentProps {
  contentKey: string;
  elementType: string;
  customProps?: Record<string, any>;
}

const UserDefinedContent: FC<UserDefinedContentProps> = async ({
  contentKey,
  elementType = "span",
  customProps,
}) => {
  const element = await fetchContentByKey(contentKey);

  return element && element.content ? (
    <ExistingContent
      content={element.content}
      elementType={elementType}
      customProps={customProps}
    />
  ) : (
    <NewContentInput
      contentKey={contentKey}
      elementType={elementType}
      customProps={customProps}
    />
  );
};

export default UserDefinedContent;
