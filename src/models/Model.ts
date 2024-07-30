import { constant } from "../constants";
import db from "../database/db";

abstract class Model {
  protected static tableName?: string;

  static get table() {
    if (!this.tableName) {
      throw new Error("The table name must be defined for the model");
    }
    return db(this.tableName);
  }

  static async insert<T>(data: T): Promise<{
    id: number;
  }> {
    const [result] = await this.table.insert(data).returning("id");
    return result;
  }

  static async findById<T>(id: number): Promise<T> {
    return this.table.where("id", id).select("*").first();
  }

  static async findAll<T>(
    offset = constant.pagination.offset,
    limit = constant.pagination.limit,
  ): Promise<[T[], number]> {
    const items = await this.table.select("*").offset(offset).limit(limit);
    const totalItems = await this.table.count("* as count").first();
    return [items, Number(totalItems?.count) || 0];
  }

  static async updateById<T>(
    id: number,
    data: T,
  ): Promise<{ id: number } | null> {
    const updatedData = await this.table
      .where({ id })
      .first()
      .update(data)
      .returning("id");
    return updatedData.length ? updatedData[0] : null;
  }

  static async removeById(id: number): Promise<{ id: number } | null> {
    const deletedData = await this.table
      .where({ id })
      .first()
      .del()
      .returning("id");
    return deletedData.length ? deletedData[0] : null;
  }
}

export default Model;
