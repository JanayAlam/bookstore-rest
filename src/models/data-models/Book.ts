import { IBook } from "../../types/book-types";
import Model from "./Model";

class Book extends Model {
  protected static tableName = "books";

  public static async findByTitle(title: string): Promise<IBook[]> {
    return this.table.where("title", title).select("*");
  }
}

export default Book;
