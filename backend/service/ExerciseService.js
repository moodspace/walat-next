'use strict';

const Model = require('../models.js');

const { DataSource, Exercise } = Model;

DataSource.sync();

const { getIncludes } = require('./CommonService.js');

/**
 * Returns information about exercises at a given lesson.
 *
 * include String Used to include nested records (optional)
 * returns List
 **/
exports.exercisesGET = function(lesson) {
  return new Promise(function(resolve, reject) {
    Exercise.findAll({
        order: [
          ['createdAt']
        ],
        where: lesson ? {
          lesson
        } : lesson
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
 * Deletes an exercise.
 *
 * id String ID of exercise
 * returns String
 **/
exports.exercisesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Exercise.destroy({
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
 * Returns information about the exercise of a specified ID.
 *
 * id String ID of exercise
 * include String Used to include nested records (optional)
 * returns Exercise
 **/
exports.exercisesIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Exercise.find({
        where: {
          id,
        },
      })
      .then(d => {
        if (include) {
          getIncludes('Exercise', d, resolve, reject);
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
 * Edits an exercise.
 *
 * id String ID of exercise
 * body Exercise Exercise content to be updated
 * returns String
 **/
exports.exercisesIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Exercise.update(body, {
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
 * Adds a new exercise to a given lesson.
 *
 * body NExercise Exercise with default ID to be added
 * returns Integer
 **/
exports.exercisesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Exercise.create(body)
      .then(d => {
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Reorders exercises.
 *
 * body Body_1 List of ordered exercise IDs
 * returns String
 **/
exports.exercisesReorderPOST = function(body) {
  const order = body.order;
  return new Promise(function(resolve, reject) {
    let newDate = Date.now();

    let promiseExercise = Exercise.update({
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
          Exercise.update({
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
      chainPromise(promiseExercise, id, nextP => {
        promiseExercise = nextP;
      });
    });

    promiseExercise.then(d => {
      if (d === null) {
        reject('Cannot find ID.');
        return;
      }

      resolve('OK');
    });
  });
}
