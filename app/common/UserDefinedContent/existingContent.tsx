import { FC, createElement } from "react";

interface ExistingContentProps {
  content: string;
  elementType: string;
  customProps?: Record<string, any>;
}

const ExistingContent: FC<ExistingContentProps> = async ({
  content,
  elementType = "span",
  customProps,
}) => {
  const Element = elementType as keyof JSX.IntrinsicElements;
  const allProps = { ...customProps };
  return createElement(Element, allProps, content);
};

export default ExistingContent;
