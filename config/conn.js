module.exports = {
    HOST: "localhost",
    USER: "root",
    password: "Ankit1420",
    DATABASE: "skumanagement",
    port: 3307,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  