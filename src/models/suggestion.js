module.exports = (connection, DataTypes) => {
  const schema = {
    suggestion: {
      type: DataTypes.TEXT,
    },
    place_id: {
      type: DataTypes.STRING,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "number of votes is required",
        },
      },
    },
  };
  const suggestionModel = connection.define('Suggestion', schema);
  return suggestionModel;
}
