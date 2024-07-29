import { Knex } from "knex";
import { IAuthor } from "../types/author-types";
import { IBook } from "../types/book-types";
import { IUser } from "../types/user-types";

declare module "knex/types/tables" {
  interface Tables {
    // user table
    users: IUser;
    users_composite: Knex.CompositeTableType<
      IUser,
      Pick<IUser, "username" | "password"> &
        Partial<Pick<IUser, "created_at" | "updated_at">>,
      Partial<Omit<IUser, "id">>
    >;

    // author table
    authors: IAuthor;
    authors_composite: Knex.CompositeTableType<
      IAuthor,
      Pick<IAuthor, "name" | "birthdate"> &
        Partial<Pick<IAuthor, "bio" | "created_at" | "updated_at">>,
      Partial<Omit<IAuthor, "id">>
    >;

    // book table
    books: IBook;
    books_composite: Knex.CompositeTableType<
      IBook,
      Pick<IBook, "title" | "published_date" | "author_id"> &
        Partial<Pick<IBook, "description" | "created_at" | "updated_at">>,
      Partial<Omit<IBook, "id">>
    >;
  }
}
