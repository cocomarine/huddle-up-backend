const Sequelize = require('sequelize');
const UserModel = require('./user');
const EventModel = require('./event');

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
    

    // User.hasMany(UserEvents);
    // UserEvents.belongsTo(User);
    // Event.hasMany(UserEvents);
    // UserEvents.belongsTo(Event);

    // Suggestion.belongsTo(User);
    // User.hasMany(Suggestion);

    // Suggestion.belongsTo(Event);
    // Event.hasMany(Suggestion);

    connection.sync({ alter: true });
    return {
        User,
        Event,
    };
};

module.exports = setupDatabase();