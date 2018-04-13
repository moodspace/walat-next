'use strict';

var utils = require('../utils/writer.js');
var Lesson = require('../service/LessonService');

module.exports.lessonsGET = function lessonsGET(req, res) {
  var klass = req.swagger.params['klass'].value;
  Lesson.lessonsGET(klass)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdDELETE = function lessonsIdDELETE(req, res) {
  var id = req.swagger.params['id'].value;
  Lesson.lessonsIdDELETE(id)
    .then(function(response) {
      res.status(204);
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdGET = function lessonsIdGET(req, res) {
  var id = req.swagger.params['id'].value;
  Lesson.lessonsIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdPATCH = function lessonsIdPATCH(req, res) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Lesson.lessonsIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsPOST = function lessonsPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Lesson.lessonsPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsReorderPOST = function lessonsReorderPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Lesson.lessonsReorderPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
