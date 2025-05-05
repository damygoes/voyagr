import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voyagr API",
      version: "1.0.0",
      description: "API documentation for the Voyagr backend.",
    },
  },
  apis: ["./src/features/**/*.ts"],
});
