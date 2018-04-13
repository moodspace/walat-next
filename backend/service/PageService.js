'use strict';

const Model = require('../models.js');

const { DataSource, Page } = Model;

DataSource.sync();

const { getIncludes } = require('./CommonService.js');

/**
 * Returns information about pages at a given exercise.
 *
 * include String Used to include nested records (optional)
 * returns List
 **/
exports.pagesGET = function(exercise) {
  return new Promise(function(resolve, reject) {
    Page.findAll({
        order: [
          ['createdAt']
        ],
        where: exercise ? {
          exercise
        } : exercise
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
 * Deletes a page.
 *
 * id String ID of page
 * returns String
 **/
exports.pagesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Page.destroy({
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
 * Returns information about the page of a specified ID.
 *
 * id String ID of page
 * include String Used to include nested records (optional)
 * returns Page
 **/
exports.pagesIdGET = function(id, include) {
  return new Promise(function(resolve, reject) {
    Page.find({
        where: {
          id,
        },
      })
      .then(d => {
        if (include) {
          getIncludes('Page', d, resolve, reject);
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
 * Edits a page.
 *
 * id String ID of page
 * body Page Page content to be updated
 * returns String
 **/
exports.pagesIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    Page.update(body, {
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
 * Adds a new page to a given exercise.
 *
 * body NPage Page with default ID to be added
 * returns String
 **/
exports.pagesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Page.create(body)
      .then(d => {
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Reorders pages.
 *
 * body Body_3 List of ordered page IDs
 * returns String
 **/
exports.pagesReorderPOST = function(body) {
  const order = body.order;
  return new Promise(function(resolve, reject) {
    let newDate = Date.now();

    let promisePage = Page.update({
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
          Page.update({
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
      chainPromise(promisePage, id, nextP => {
        promisePage = nextP;
      });
    });

    promisePage.then(d => {
      if (d === null) {
        reject('Cannot find ID.');
        return;
      }

      resolve('OK');
    });
  });
}
