import { IBook } from "../types/book-types";
import Model from "./Model";

class Book extends Model {
  protected static tableName = "books";

  static async findByTitle(title: string): Promise<IBook[]> {
    return this.table.where("title", title).select("*");
  }

  static async findByAuthorId(authorId: number): Promise<IBook[]> {
    return this.table.where("author_id", authorId).select("*");
  }
}

export default Book;
