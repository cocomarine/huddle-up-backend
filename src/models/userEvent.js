module.exports = (connection, DataTypes) => {
  const schema = {
    votes_cast: DataTypes.INTEGER,
    // allowNull: false,
    // validate: {
    //   notNull: {
    //     args: [true],
    //     msg: "number of votes cast is required",
    //   },
    // },
  };
  const userEventModel = connection.define('UserEvent', schema);
  return userEventModel;
}