const Sequelize = require('sequelize');
const UserModel = require('./user');
const EventModel = require('./event');
const SuggestionModel = require('./suggestion');
const UserEventModel = require('./userEvent');

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        port: PGPORT,
        dialect: 'postgres',
        logging: false,
        define: { timestamps: false },
    });

    const User = UserModel(connection, Sequelize);
    const Event = EventModel(connection, Sequelize);
    const Suggestion = SuggestionModel(connection, Sequelize);
    const UserEvent = UserEventModel(connection, Sequelize);

    User.hasMany(Event, {
      foreignKey: {
        allowNull: true,
        validate: {
            notEmpty: true,
        },
      },
    });
    Event.belongsTo(User, { 
      // as: 'Admin', 
      foreignKey: {
        allowNull: true,
        validate: {
            notEmpty: true,
        },
      }, 
    });
    User.hasMany(UserEvent, {
      foreignKey: {
        allowNull: true,
        validate: {
            notEmpty: true,
        },
      },
    });
    UserEvent.belongsTo(User, {
      foreignKey: {
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
    });
    Event.hasMany(UserEvent, {
      foreignKey: {
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
    });
    UserEvent.belongsTo(Event, {
      foreignKey: {
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
    });
    Suggestion.belongsTo(User, {
      foreignKey: {
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
    });
    User.hasMany(Suggestion, {
      foreignKey: {
        allowNull: true,
        validate: {
            notEmpty: true,
        },
      },
    });
    Suggestion.belongsTo(Event, {
      foreignKey: {
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
    });
    Event.hasMany(Suggestion, {
      foreignKey: {
        allowNull: true,
        validate: {
            notEmpty: true,
        },
      },
    });

    connection.sync({ alter: true });
    return {
        User,
        Event,
        Suggestion,
        UserEvent,
    };
};

module.exports = setupDatabase();