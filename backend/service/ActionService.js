'use strict';

const Model = require('../models.js');

const { DataSource, Action } = Model;

DataSource.sync();

/**
 * Returns information about actions at a given page.
 *
 * returns List
 **/
exports.actionsGET = function(page) {
  return new Promise(function(resolve, reject) {
    Action.findAll({
        order: [
          ['createdAt']
        ],
        where: page ? {
          page
        } : page
      })
      .then(list => {
        list = list.map(d => {
          d.value = JSON.parse(d.value);
          return d;
        });
        resolve(list);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Deletes a action.
 *
 * id String ID of action
 * returns String
 **/
exports.actionsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Action.destroy({
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
 * Returns information about the action of a specified ID.
 *
 * id String ID of action
 * returns Action
 **/
exports.actionsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    Action.find({
        where: {
          id,
        },
      })
      .then(d => {
        d.value = JSON.parse(d.value);
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Edits a action.
 *
 * id String ID of action
 * body Action Action content to be updated
 * returns String
 **/
exports.actionsIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    body.value = JSON.stringify(body.value);
    Action.update(body, {
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
 * Adds a new action to a given page.
 *
 * body NAction Action with default ID to be added
 * returns String
 **/
exports.actionsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    body.value = JSON.stringify(body.value);
    Action.create(body)
      .then(d => {
        d.value = JSON.parse(d.value);
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Reorders actions.
 *
 * body Body List of ordered action IDs
 * returns String
 **/
exports.actionsReorderPOST = function(body) {
  const order = body.order;
  return new Promise(function(resolve, reject) {
    let newDate = Date.now();

    let promiseAction = Action.update({
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
          Action.update({
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
      chainPromise(promiseAction, id, nextP => {
        promiseAction = nextP;
      });
    });

    promiseAction.then(d => {
      if (d === null) {
        reject('Cannot find ID.');
        return;
      }

      resolve('OK');
    });
  });
}
