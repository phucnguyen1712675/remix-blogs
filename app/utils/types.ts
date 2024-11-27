import { type SerializeFrom } from "@remix-run/server-runtime";

export type SerializedPost = SerializeFrom<{
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type ActionErrors = {
  title?: string;
  content?: string;
  excerpt?: string;
  _form?: string;
}; 