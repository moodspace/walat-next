const Model = require('../models.js');

const { DataSource, Lesson, Exercise, Page, Action } = Model;

DataSource.sync();

const getIncludes = (parentType, parent, resolve, reject) => {
  if (Array.isArray(parent)) {
    let finished = 0;
    const cb = () => {
      finished += 1;
      if (finished === parent.length) {
        resolve(parent);
      }
    };
    parent.map(p => getIncludes(parentType, p, cb, reject));
  } else {
    switch (parentType) {
      case 'Klass':
        Lesson.findAll({
            where: { klass: parent.id },
            order: [
              ['createdAt']
            ],
          })
          .then(nestedList => {
            parent.dataValues.lessons = nestedList;
            resolve(parent);
          })
          .catch(reason => {
            reject(reason);
          });
        break;
      case 'Lesson':
        Exercise.findAll({
            where: { lesson: parent.id },
            order: [
              ['createdAt']
            ],
          })
          .then(nestedList => {
            parent.dataValues.exercises = nestedList;
            resolve(parent);
          })
          .catch(reason => {
            reject(reason);
          });
        break;
      case 'Exercise':
        Page.findAll({
            where: { exercise: parent.id },
            order: [
              ['createdAt']
            ],
          })
          .then(nestedList => {
            parent.dataValues.lessons = nestedList;
            resolve(parent);
          })
          .catch(reason => {
            reject(reason);
          });
        break;
      case 'Page':
        Action.findAll({
            where: { lesson: parent.id },
            order: [
              ['createdAt']
            ],
          })
          .then(nestedList => {
            parent.dataValues.actions = nestedList;
            resolve(parent);
          })
          .catch(reason => {
            reject(reason);
          });
        break;
      default:
        break;
    }
  }
};

exports.getIncludes = getIncludes;
