interface IConfig {
  port: number;
  environment: "production" | "development" | "test";
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}

const config: IConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 8080,
  environment:
    process.env.NODE_ENV === "production"
      ? "production"
      : process.env.NODE_ENV === "test"
        ? "test"
        : "development",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  dbName: process.env.DB_NAME || "bookstore_db",
  dbUsername: process.env.DB_USERNAME || "postgres",
  dbPassword: process.env.DB_PASSWORD || "root",
};

export default config;
