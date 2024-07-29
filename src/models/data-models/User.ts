import { IUser } from "../../types/user-types";
import Model from "./Model";

class User extends Model {
  protected static tableName = "users";

  public static async findByUsername(username: string): Promise<IUser | null> {
    return this.table.where("username", username).select("*").first();
  }
}

export default User;
