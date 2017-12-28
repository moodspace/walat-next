/* eslint-disable */

const path = require('path');

const dbPath = path.join(__dirname, 'db.sqlite');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: dbPath
});

const Action = sequelize.define('action', {
  uuid: Sequelize.STRING,
  value: Sequelize.TEXT('long'),
  type: Sequelize.STRING,
});

const Page = sequelize.define('page', {
  uuid: Sequelize.STRING,
});

const Exercise = sequelize.define('exercise', {
  name: Sequelize.STRING,
  uuid: Sequelize.STRING,
});

const Lesson = sequelize.define('lesson', {
  name: Sequelize.STRING,
  uuid: Sequelize.STRING,
});

Page.hasMany(Action, {foreignKey: 'page', targetKey: 'id'});
Exercise.hasMany(Page, {foreignKey: 'exercise', targetKey: 'id'});
Lesson.hasMany(Exercise, {foreignKey: 'lesson', targetKey: 'id'});

exports.DataSource = sequelize;
exports.Action = Action;
exports.Page = Page;
exports.Exercise = Exercise;
exports.Lesson = Lesson;
