module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "title is required",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "description is required",
        },
      },
    },
    total_votes: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     args: [true],
      //     msg: "total number of votes is required",
      //   },
      // },
    },
    // voting_finished: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       args: [true],
    //       msg: "boolean value is required",
    //     },
    //   },
    // },
  };

  const eventModel = connection.define('Event', schema);
  return eventModel;
}
