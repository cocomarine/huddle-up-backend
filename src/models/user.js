module.exports = (connection, DataTypes) => {
  const schema = {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
          args: [true],
          msg: "email already exists"
      },
      validate: {
          notNull: {
              args: [true],
              msg: "email is required"
          },
          notEmpty: {
              args: [true],
              msg: "email cannot be empty"
          },
          isEmail: {
              args: [true],
              msg: "email is in incorrect format"
          },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            args: [true],
            msg: "password is required"
        },
        notEmpty: {
            args: [true],
            msg: "password cannot be empty"
        },
        len: {
            args: [9, ],
            msg: "password should be longer than 8 characters"
        },
      },
    },
  };

  const UserModel = connection.define('User', schema);
  return UserModel;
};