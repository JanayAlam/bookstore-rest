export interface IAuthor {
  id: number;
  name: string;
  bio?: string;
  birthdate: Date;
  updated_at: Date;
  created_at: Date;
}

export interface ICreateAuthorRequestBody {
  name: string;
  birthdate: Date;
  bio?: string;
}

export interface IUpdateAuthorRequestBody {
  name?: string;
  birthdate?: Date;
  bio?: string;
}
