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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "event date is required",
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
    participants: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_votes: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
  };

  const eventModel = connection.define('Event', schema);
  return eventModel;
}
