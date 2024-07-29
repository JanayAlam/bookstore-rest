import { IAuthor } from "../types/author-types";
import Model from "./Model";

class Author extends Model {
  protected static tableName = "authors";

  static async findByName(name: string): Promise<IAuthor[]> {
    return this.table.where("name", name).select("*");
  }
}

export default Author;
