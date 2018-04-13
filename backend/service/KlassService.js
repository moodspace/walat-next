'use strict';

const Model = require('../models.js');

const { DataSource, Klass } = Model;

DataSource.sync();

const { getIncludes } = require('./CommonService.js');

/**
 * Returns information about klasses.
 *
 * include String Used to include nested records (optional)
 * returns List
 **/
exports.klassesGET = function() {
  return new Promise(function(resolve, reject) {
    Klass.findAll({
        order: [
          ['createdAt']
        ],
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
 * Deletes a klass.
 *
 * id String ID of klass
 * returns String
 **/
exports.klassesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Klass.destroy({
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
      })
      .then(d => {
        if (include) {
          getIncludes('Klass', d, resolve, reject);
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
 * Adds a new klass.
 *
 * body NKlass Klass with default ID to be added
 * returns Integer
 **/
exports.klassesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Klass.create(body)
      .then(d => {
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}
