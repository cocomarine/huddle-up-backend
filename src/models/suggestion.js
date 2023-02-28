module.exports = (connection, DataTypes) => {
  const schema = {
    suggestion: {
      type: DataTypes.TEXT,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "total number of votes is required",
        },
      },
    },
  };
  const suggestionModel = connection.define('Suggestion', schema);
  return suggestionModel;
}
