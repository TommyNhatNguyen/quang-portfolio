import { BlocksContent } from "@strapi/blocks-react-renderer";
import { IntelLevel } from "./intel-level.interface";
import { ReadTime } from "./read-me.interface";
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
  read_time: ReadTime | null;
  intel_level: IntelLevel | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
