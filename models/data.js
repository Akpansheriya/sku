module.exports = (sequelize, DataTypes) => {
    const Data = sequelize.define("data", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
 
      name: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      surname: {
        type: DataTypes.INTEGER,
        allowNULL: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNULL: false,
      },
      year_of_birth: {
        type: DataTypes.INTEGER,
        allowNULL: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
    });
  
    return Data;
  };
  