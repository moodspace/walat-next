'use strict';

const Model = require('../models.js');

const {
  DataSource,
  Action,
  Page,
  Exercise,
  Lesson,
  Klass,
} = Model;

DataSource.sync();

/**
 * Returns information about actions at a given page.
 *
 * returns List
 **/
exports.actionsGET = function() {
  return new Promise(function(resolve, reject) {
    Action.findAll({
      order: [
        ['createdAt'],
      ],
    }).then((list) => {
      list = list.map((d) => {
        d.value = JSON.parse(d.value);
        return d;
      });
      resolve(list);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Deletes a action.
 *
 * id Integer ID of action
 * returns String
 **/
exports.actionsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Action.destroy({
      where: {
        id
      },
    }).then((d) => {
      d.value = JSON.parse(d.value);
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Returns information about the action of a specified ID.
 *
 * id Integer ID of action
 * returns Action
 **/
exports.actionsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    Action.find({
      where: {
        id,
      },
    }).then((d) => {
      d.value = JSON.parse(d.value);
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Edits a action.
 *
 * id Integer ID of action
 * body Action Action with given ID to be updated
 * returns String
 **/
exports.actionsIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    body.value = JSON.stringify(body.value);
    Action.update(body, {
      where: {
        id,
      },
    }).then(() => {
      resolve({ id });
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Adds a new action to a given page.
 *
 * body Action Action with default ID to be added
 * returns String
 **/
exports.actionsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    body.value = JSON.stringify(body.value);
    Action.create(body).then((d) => {
      d.value = JSON.parse(d.value);
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    })
  });
}


/**
 * Returns information about exercises at a given lesson.
 *
 * returns List
 **/
exports.exercisesGET = function(include) {
  return new Promise(function(resolve, reject) {
    Exercise.findAll({
      order: [
        ['createdAt'],
      ],
    }).then((list) => {
      if (include) {
        getIncludes('Exercise', list, resolve, reject);
      } else {
        resolve(list);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Deletes an exercise.
 *
 * id Integer ID of exercise
 * returns String
 **/
exports.exercisesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Exercise.destroy({
      where: {
        id
      },
    }).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Returns information about the exercise of a specified ID.
 *
 * id Integer ID of exercise
 * returns Exercise
 **/
exports.exercisesIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Exercise.find({
      where: {
        id,
      },
    }).then((d) => {
      if (include) {
        getIncludes('Exercise', d, resolve, reject);
      } else {
        resolve(d);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Reorders an exercise.
 *
 * id Integer ID of exercise
 * body List List of ordered page IDs
 * returns String
 **/
exports.exercisesIdReorderPOST = function(id, body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edits an exercise.
 *
 * id Integer ID of exercise
 * body Exercise Exercise with given ID to be updated
 * returns String
 **/
exports.exercisesIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Exercise.update(body, {
      where: {
        id,
      },
    }).then(() => {
      resolve({ id });
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Adds a new exercise to a given lesson.
 *
 * body Exercise Exercise with default ID to be added
 * returns Integer
 **/
exports.exercisesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Exercise.create(body).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    })
  });
}


/**
 * Returns information about klasses.
 *
 * include String Used to include nested records (optional)
 * returns List
 **/
exports.klassesGET = function(include) {
  return new Promise(function(resolve, reject) {
    Klass.findAll({
      order: [
        ['createdAt'],
      ],
    }).then((list) => {
      if (include) {
        getIncludes('Klass', list, resolve, reject);
      } else {
        resolve(list);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Deletes a klass.
 *
 * id String ID of klass
 * returns String
 **/
exports.klassesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Klass.destroy({
      where: {
        id
      },
    }).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Returns information about the klass of a specified ID.
 *
 * id String ID of klass
 * include String Used to include nested records (optional)
 * returns Klass
 **/
exports.klassesIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Klass.find({
      where: {
        id,
      },
    }).then((d) => {
      if (include) {
        getIncludes('Klass', d, resolve, reject);
      } else {
        resolve(d);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Edits a klass.
 *
 * id String ID of klass
 * body Klass Klass content to be updated
 * returns String
 **/
exports.klassesIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Klass.update(body, {
      where: {
        id,
      },
    }).then(() => {
      resolve({ id });
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Adds a new klass.
 *
 * body NKlass Klass with default ID to be added
 * returns Integer
 **/
exports.klassesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Klass.create(body).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    })
  });
}


/**
 * Returns information about lessons.
 *
 * returns List
 **/
exports.lessonsGET = function(include) {
  return new Promise(function(resolve, reject) {
    Lesson.findAll({
      order: [
        ['createdAt'],
      ],
    }).then((list) => {
      if (include) {
        getIncludes('Lesson', list, resolve, reject);
      } else {
        resolve(list);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Deletes a lesson.
 *
 * id Integer ID of lesson
 * returns String
 **/
exports.lessonsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Lesson.destroy({
      where: {
        id
      },
    }).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Returns information about the lesson of a specified ID.
 *
 * id Integer ID of lesson
 * returns Lesson
 **/
exports.lessonsIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Lesson.find({
      where: {
        id,
      },
    }).then((d) => {
      if (include) {
        getIncludes('Lesson', d, resolve, reject);
      } else {
        resolve(d);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Reorders a lesson.
 *
 * id Integer ID of lesson
 * body List List of ordered exercise IDs
 * returns String
 **/
exports.lessonsIdReorderPOST = function(id, body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edits a lesson.
 *
 * id Integer ID of lesson
 * body Lesson Lesson with given ID to be updated
 * returns String
 **/
exports.lessonsIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Lesson.update(body, {
      where: {
        id,
      },
    }).then(() => {
      resolve({ id });
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Adds a new lesson.
 *
 * body Lesson Lesson with default ID to be added
 * returns Integer
 **/
exports.lessonsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Lesson.create(body).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    })
  });
}


/**
 * Returns information about pages at a given exercise.
 *
 * returns List
 **/
exports.pagesGET = function(include) {
  return new Promise(function(resolve, reject) {
    Page.findAll({
      order: [
        ['createdAt'],
      ],
    }).then((list) => {
      if (include) {
        getIncludes('Page', list, resolve, reject);
      } else {
        resolve(list);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Deletes a page.
 *
 * id Integer ID of page
 * returns String
 **/
exports.pagesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Page.destroy({
      where: {
        id
      },
    }).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Returns information about the page of a specified ID.
 *
 * id Integer ID of page
 * returns Page
 **/
exports.pagesIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Page.find({
      where: {
        id,
      },
    }).then((d) => {
      if (include) {
        getIncludes('Page', d, resolve, reject);
      } else {
        resolve(d);
      }
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Edits a page.
 *
 * id Integer ID of page
 * body Page Page with given ID to be updated
 * returns String
 **/
exports.pagesIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Page.update(body, {
      where: {
        id,
      },
    }).then(() => {
      resolve({ id });
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * Adds a new page to a given exercise.
 *
 * body Page Page with default ID to be added
 * returns String
 **/
exports.pagesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Page.create(body).then((d) => {
      resolve(d);
    }).catch((reason) => {
      reject(reason);
    })
  });
}

const getIncludes = (parentType, parent, resolve, reject) => {
  if (Array.isArray(parent)) {
    let finished = 0;
    const cb = () => {
      finished += 1;
      if (finished === parent.length) {
        resolve(parent);
      }
    }
    parent.map((p) => getIncludes(parentType, p, cb, reject));
  } else {
    switch (parentType) {
      case 'Klass':
        Lesson.findAll({
          where: { klass: parent.id },
          order: [
            ['createdAt'],
          ],
        }).then((nestedList) => {
          parent.dataValues.lessons = nestedList;
          resolve(parent);
        }).catch((reason) => {
          reject(reason);
        });
        break;
      case 'Lesson':
        Exercise.findAll({
          where: { lesson: parent.id },
          order: [
            ['createdAt'],
          ],
        }).then((nestedList) => {
          parent.dataValues.exercises = nestedList;
          resolve(parent);
        }).catch((reason) => {
          reject(reason);
        });
        break;
      case 'Exercise':
        Page.findAll({
          where: { exercise: parent.id },
          order: [
            ['createdAt'],
          ],
        }).then((nestedList) => {
          parent.dataValues.pages = nestedList;
          resolve(parent);
        }).catch((reason) => {
          reject(reason);
        });
        break;
      case 'Page':
        Action.findAll({
          where: { page: parent.id },
          order: [
            ['createdAt'],
          ],
        }).then((nestedList) => {
          parent.dataValues.actions = nestedList;
          resolve(parent);
        }).catch((reason) => {
          reject(reason);
        });
        break;
      default:
        break;
    }
  }
}
