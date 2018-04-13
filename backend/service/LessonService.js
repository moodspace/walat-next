'use strict';

const Model = require('../models.js');

const { DataSource, Lesson } = Model;

DataSource.sync();

const { getIncludes } = require('./CommonService.js');

/**
 * Returns information about lessons at a given exercise.
 *
 * include String Used to include nested records (optional)
 * returns List
 **/
exports.lessonsGET = function(klass) {
  return new Promise(function(resolve, reject) {
    Lesson.findAll({
        order: [
          ['createdAt']
        ],
        where: klass ? {
          klass
        } : klass
      })
      .then(list => {
        resolve(list);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Deletes a lesson.
 *
 * id String ID of lesson
 * returns String
 **/
exports.lessonsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Lesson.destroy({
        where: {
          id,
        },
      })
      .then(() => {
        resolve({id});
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Returns information about the lesson of a specified ID.
 *
 * id String ID of lesson
 * include String Used to include nested records (optional)
 * returns Lesson
 **/
exports.lessonsIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Lesson.find({
        where: {
          id,
        },
      })
      .then(d => {
        if (include) {
          getIncludes('Lesson', d, resolve, reject);
        } else {
          resolve(d);
        }
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Edits a lesson.
 *
 * id String ID of lesson
 * body Lesson Lesson content to be updated
 * returns String
 **/
exports.lessonsIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Lesson.update(body, {
        where: {
          id,
        },
      })
      .then(() => {
        resolve({ id });
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Adds a new lesson to a given exercise.
 *
 * body NLesson Lesson with default ID to be added
 * returns String
 **/
exports.lessonsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Lesson.create(body)
      .then(d => {
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Reorders lessons.
 *
 * body Body_3 List of ordered lesson IDs
 * returns String
 **/
exports.lessonsReorderPOST = function(body) {
  const order = body.order;
  return new Promise(function(resolve, reject) {
    let newDate = Date.now();

    let promiseLesson = Lesson.update({
      createdAt: newDate,
      updatedAt: newDate,
    }, {
      where: {
        id: order[0],
      },
    }, );

    const chainPromise = (promise, arg, cb) => {
      promise.then(d => {
        if (d === null) {
          reject('Cannot find ID.');
          return;
        }
        newDate += 100;
        cb(
          Lesson.update({
            createdAt: newDate,
            updatedAt: newDate,
          }, {
            where: {
              id: arg,
            },
          }, ),
        );
      });
    };

    order.forEach(id => {
      chainPromise(promiseLesson, id, nextP => {
        promiseLesson = nextP;
      });
    });

    promiseLesson.then(d => {
      if (d === null) {
        reject('Cannot find ID.');
        return;
      }

      resolve('OK');
    });
  });
}
