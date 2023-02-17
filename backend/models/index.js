const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const Challenge = require('./Challenge');
const Chat = require('./Chat');
const MatePost = require('./MatePost');
const User = require('./User');

const config = require('../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Challenge = Challenge;
db.MatePost = MatePost;
db.Chat = Chat;

User.init(sequelize);
Challenge.init(sequelize);
MatePost.init(sequelize);
Chat.init(sequelize);

User.associate(db);
Challenge.associate(db);
MatePost.associate(db);
Chat.associate(db);

module.exports = db;
