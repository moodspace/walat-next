'use strict';

const Model = require('../models.js');

const { DataSource, Template } = Model;

DataSource.sync();

const { getIncludes } = require('./CommonService.js');

/**
 * Returns information about templates at a given page.
 *
 * returns List
 **/
exports.templatesGET = function() {
  return new Promise(function(resolve, reject) {
    Template.findAll({
        order: [
          ['createdAt']
        ],
      })
      .then(list => {
        list = list.map(d => {
          d.collection = JSON.parse(d.collection);
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
 * Deletes a template.
 *
 * id String ID of template
 * returns String
 **/
exports.templatesIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    Template.destroy({
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
 * Returns information about the template of a specified ID.
 *
 * id String ID of template
 * returns Template
 **/
exports.templatesIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    Template.find({
        where: {
          id,
        },
      })
      .then(d => {
        d.collection = JSON.parse(d.collection);
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}


/**
 * Edits a template.
 *
 * id String ID of template
 * body Template Template content to be updated
 * returns String
 **/
exports.templatesIdPATCH = function(id, body) {
  return new Promise(function(resolve, reject) {
    body.collection = JSON.stringify(body.collection);
    Template.update(body, {
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
 * Adds a new template to a given page.
 *
 * body NTemplate Template with default ID to be added
 * returns String
 **/
exports.templatesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    body.collection = JSON.stringify(body.collection);
    Template.create(body)
      .then(d => {
        d.collection = JSON.parse(d.collection);
        resolve(d);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}
