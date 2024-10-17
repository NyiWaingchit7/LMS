import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  Font,
  FontSize,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface Props {
  setContent: (data?: any) => void;
  content: string;
}

export const Editor = ({ setContent, content }: Props) => {
  return (
    <CKEditor
      onChange={(e, data) => {
        setContent(data.getData());
        console.log(data.getData());
      }}
      editor={ClassicEditor}
      data={content}
      config={{
        fontSize: {
          options: [9, 11, 13, "default"],
          supportAllValues: true,
        },

        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "insertTable",
          "mediaEmbed",
          "|",
          "bulletedList",
          "numberedList",
          "indent",
          "outdent",
          "fontSize",
        ],
        plugins: [
          Bold,
          Essentials,
          Heading,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          MediaEmbed,
          Paragraph,
          Table,
          Undo,
          Font,
          FontSize,
        ],
      }}
    />
  );
};
