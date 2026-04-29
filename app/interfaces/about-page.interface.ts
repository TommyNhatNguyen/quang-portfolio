import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Media } from "./base.dto";

// export interface RichTextNode {
//   type: "text";
//   text: string;
// }

// export interface RichTextListItem {
//   type: "list-item";
//   children: RichTextNode[];
// }

// export interface RichTextParagraph {
//   type: "paragraph";
//   children: RichTextNode[];
// }

// export interface RichTextList {
//   type: "list";
//   format: "unordered" | "ordered";
//   children: RichTextListItem[];
// }

// export type RichTextBlock = RichTextParagraph | RichTextList;

export interface SectionItem {
  id: number;
  time: string;
  content: BlocksContent;
}

export interface Section {
  id: number;
  section_title: string;
  section_items: SectionItem[];
}

export interface AboutPage {
  id: number;
  documentId: string;
  song_name: string;
  song_rpm: string;
  introduction_text: string | null;
  song_audio_file: Media;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
