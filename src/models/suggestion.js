module.exports = (connection, DataTypes) => {
  const schema = {
    votes: DataTypes.INTEGER,
    // allowNull: false,
    // validate: {
    //   notNull: {
    //     args: [true],
    //     msg: "total number of votes is required",
    //   },
    // },
  };
  const suggestionModel = connection.define('Suggestion', schema);
  return suggestionModel;
}