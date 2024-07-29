import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // deletes all existing entries
  await knex("books").del();

  const books = [];

  for (let i = 0; i < 15; i++) {
    books.push({
      title: faker.animal.lion(),
      description: faker.lorem.paragraphs(),
      published_date: faker.date.past(),
      author_id: i + 1,
    });
    books.push({
      title: faker.animal.lion(),
      description: faker.lorem.paragraphs(),
      published_date: faker.date.past(),
      author_id: i + 1,
    });
  }

  // inserts seed entries
  await knex("books").insert(books);
}
