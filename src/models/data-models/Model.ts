import db from "../../database/db";

abstract class Model {
  protected static tableName?: string;

  protected static get table() {
    if (!this.tableName) {
      throw new Error("The table name must be defined for the model");
    }
    return db(this.tableName);
  }

  protected static async insert<T>(data: T): Promise<{
    id: number;
  }> {
    const [result] = await this.table.insert(data).returning("id");
    return result;
  }

  protected static async findById<T>(id: number): Promise<T> {
    return this.table.where("id", id).select("*").first();
  }

  protected static async findAll<T>(): Promise<T[]> {
    return this.table.select("*");
  }
}

export default Model;
