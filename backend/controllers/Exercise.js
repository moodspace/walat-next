'use strict';

var utils = require('../utils/writer.js');
var Exercise = require('../service/ExerciseService');

module.exports.exercisesGET = function exercisesGET(req, res) {
  var lesson = req.swagger.params['lesson'].value;
  Exercise.exercisesGET(lesson)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdDELETE = function exercisesIdDELETE(req, res) {
  var id = req.swagger.params['id'].value;
  Exercise.exercisesIdDELETE(id)
    .then(function(response) {
      res.status(204);
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdGET = function exercisesIdGET(req, res) {
  var id = req.swagger.params['id'].value;
  Exercise.exercisesIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdPATCH = function exercisesIdPATCH(req, res) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Exercise.exercisesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesPOST = function exercisesPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Exercise.exercisesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesReorderPOST = function exercisesReorderPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Exercise.exercisesReorderPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
