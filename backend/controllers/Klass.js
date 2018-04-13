'use strict';

var utils = require('../utils/writer.js');
var Klass = require('../service/KlassService');

module.exports.klassesGET = function klassesGET(req, res) {
  Klass.klassesGET()
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesIdDELETE = function klassesIdDELETE(req, res) {
  var id = req.swagger.params['id'].value;
  Klass.klassesIdDELETE(id)
    .then(function(response) {
      res.status(204);
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesIdGET = function klassesIdGET(req, res) {
  var id = req.swagger.params['id'].value;
  Klass.klassesIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesIdPATCH = function klassesIdPATCH(req, res) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Klass.klassesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesPOST = function klassesPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Klass.klassesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
