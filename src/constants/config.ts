interface IConfig {
  port: number;
  environment: "production" | "development" | "test";
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
  dbName: process.env.DB_NAME || "bookstore_db",
  dbUsername: process.env.DB_USERNAME || "postgres",
  dbPassword: process.env.DB_PASSWORD || "root",
};

export default config;
