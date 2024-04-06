module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
 
      email: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      emailToken: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      activity: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
    });
  
    return Admin;
  };
  