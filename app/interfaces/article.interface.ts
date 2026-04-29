import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Media } from "./base.dto";

export interface Category {
  id: number;
  documentId: string;
  slug: string;
  category_name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Article {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  short_description: string;
  content: BlocksContent;
  is_link: boolean;
  link: string | null;
  thumbnail: Media;
  categories: Category[];
  read_time: string | null;
  intel_level: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
