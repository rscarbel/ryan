import dynamic from "next/dynamic";

const DynamicTextEditor = dynamic(() => import("./BlogPostForm"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

const MarkdownEditor: React.FC = () => {
  return (
    <>
      <DynamicTextEditor />
    </>
  );
};

export default MarkdownEditor;
