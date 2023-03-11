const Sequelize = require('sequelize');
const UserModel = require('./user');
const EventModel = require('./event');
const SuggestionModel = require('./suggestion');
const UserEventModel = require('./userEvent');
const RoleModel = require('./role');

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
    const Role = RoleModel(connection, Sequelize);

    User.belongsToMany(Event, {
      through: UserEvent,
    });
    Event.belongsToMany(User, { 
      through: UserEvent,
    });
    Event.belongsTo(User, { 
      as: 'Admin',
    });

    User.hasMany(UserEvent);
    UserEvent.belongsTo(User);
    Event.hasMany(UserEvent);
    UserEvent.belongsTo(Event);

    User.hasMany(Suggestion);
    Suggestion.belongsTo(User);

    Event.hasMany(Suggestion);
    Suggestion.belongsTo(Event);

    // UserEvent.belongsTo(Suggestion, {
    //   as: 'VotedSuggestion',
    // });

    // User.belongsToMany(Role);
    // Role.belongsToMany(Role);


    connection.sync({ alter: true });
    return {
        User,
        Event,
        Suggestion,
        UserEvent,
        Role
    };
};

module.exports = setupDatabase();