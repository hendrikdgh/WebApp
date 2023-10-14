const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contacts = require('./contact.model.js')(sequelize, Sequelize);
db.phones = require('./phone.model.js')(sequelize, Sequelize);

// Define the 1-many relationship between contacts and phones
db.contacts.hasMany(db.phones, { as: 'phones' });
db.phones.belongsTo(db.contacts, {
  foreignKey: 'contactId',
  as: 'contact',
});

module.exports = db;
