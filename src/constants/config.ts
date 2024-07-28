interface IConfig {
  port: number;
  environment: "production" | "development" | "test";
}

const config: IConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 8080,
  environment:
    process.env.NODE_ENV === "production"
      ? "production"
      : process.env.NODE_ENV === "test"
        ? "test"
        : "development",
};

export default config;
