import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // deletes all existing entries
  await knex("authors").del();

  const authors = [];

  for (let i = 0; i < 15; i++) {
    authors.push({
      name: faker.person.fullName(),
      bio: faker.person.bio(),
      birthdate: faker.date.birthdate(),
    });
  }

  // inserts seed entries
  await knex("authors").insert(authors);
}
