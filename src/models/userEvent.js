module.exports = (connection, DataTypes) => {
  const schema = {
    // forcing to have a single primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    votes_cast: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "boolean value is required",
        },
      },
    },
  };
  const userEventModel = connection.define('UserEvent', schema);
  return userEventModel;
}