const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "미니 프로젝트",
      description:
        "Express Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:3000", // 요청 URL
      },
    ],
  },
    apis: ["./express-demo/routers/*.js"], //Swagger 파일 연동
}
const specs = swaggerJsdoc(options)

module.exports = { swaggerUi, specs }