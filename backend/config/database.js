import { Sequelize } from "sequelize";

const db = new Sequelize("benerin_motor", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
