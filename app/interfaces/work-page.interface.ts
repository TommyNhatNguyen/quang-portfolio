import { Media } from "./base.dto";

export interface Introduction {
  id: number;
  text: string;
}

export interface WorkCard {
  id: number;
  progress: number;
  title: string;
  thumbnail: Media;
}

export interface WorkItem {
  id: number;
  title: string;
  description: string;
  year: string;
  link: string;
  background_color: string;
  text_color: string;
  work_cards: WorkCard;
}

export interface WorkPage {
  id: number;
  documentId: string;
  introduction: Introduction[];
  open_to_text: string;
  offer_text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  work_items: WorkItem[];
}
