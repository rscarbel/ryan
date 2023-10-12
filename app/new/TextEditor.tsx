"use client";
import { ReactElement } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import chart from "@toast-ui/editor-plugin-chart";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/chart/dist/toastui-chart.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";

interface TextEditorProps {
  editorRef: React.RefObject<Editor>;
}

const TextEditor: React.FC<TextEditorProps> = ({ editorRef }): ReactElement => {
  return (
    <Editor
      previewStyle="horizontal"
      ref={editorRef}
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      initialValue=" "
      plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell]}
    />
  );
};

export default TextEditor;
