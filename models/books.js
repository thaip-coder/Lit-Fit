module.exports = function (sequelize, DataTypes) {
  var Books = sequelize.define("Books", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter title"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter author name"
        }
      }
    },
    totalPages: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    pages: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Books;
};
