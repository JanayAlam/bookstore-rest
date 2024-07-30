import { IAuthor } from "./author-types";

export interface IBook {
  id: number;
  title: string;
  description?: string;
  published_date: Date;
  author_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface IBookWithAuthor extends Omit<IBook, "author_id"> {
  author: IAuthor;
}

export interface ICreateBookRequestBody {
  title: string;
  description?: string;
  published_date: Date;
  author_id: number;
}

export interface IUpdateBookRequestBody {
  title?: string;
  description?: string;
  published_date?: Date;
  author_id?: number;
}
