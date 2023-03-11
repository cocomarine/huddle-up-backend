module.exports = (connection, DataTypes) => {
  const schema = {
    // forcing to have a single primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    voted_suggestionId: {
      type: DataTypes.INTEGER,
    }
  };
  const UserEventModel = connection.define('UserEvent', schema);
  return UserEventModel;
};