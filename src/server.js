require("dotenv").config();

const http = require("http");
const sequelize =
  require("./config/db");

const app = require("./app");

const {
  initSocket,
} = require("./config/socket");

const server =
  http.createServer(app);

initSocket(server);

sequelize
  .sync()
  .then(() => {
    server.listen(
      process.env.PORT || 5000,
      () => {
        console.log(
          "Server Running"
        );
      }
    );
  });