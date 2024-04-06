const { Sequelize, DataTypes } = require("sequelize");
const connect = require("./conn");
const sequelize = new Sequelize(
  connect.DATABASE,
  connect.USER,
  connect.password,

  {
    host: connect.HOST,
    port: connect.port,
    dialect: connect.dialect,
    operatorsAliases: false,

    pool: {
      max: connect.pool.max,
      min: connect.pool.min,
      acquire: connect.pool.acquire,
      idle: connect.pool.idle,
    },
  }
);
try {
  sequelize.authenticate();
  console.log("connection established");
} catch (error) {
  console.log(error);
}

const Database = {};

//------------------ vets ---------------------//

Database.admin = require("../models/admin")(
  sequelize,
  DataTypes
);
Database.data = require("../models/data")(
    sequelize,
    DataTypes
  );
Database.sequelize = sequelize;




Database.sequelize.sync({ force: false }).then(() => {
  console.log("yes sync resync done");
});

module.exports = { sequelize };
module.exports = Database;
