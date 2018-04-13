'use strict';

var utils = require('../utils/writer.js');
var Action = require('../service/ActionService');

module.exports.actionsGET = function actionsGET(req, res) {
  var page = req.swagger.params['page'].value;
  Action.actionsGET(page)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsIdDELETE = function actionsIdDELETE(req, res) {
  var id = req.swagger.params['id'].value;
  Action.actionsIdDELETE(id)
    .then(function(response) {
      res.status(204);
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsIdGET = function actionsIdGET(req, res) {
  var id = req.swagger.params['id'].value;
  Action.actionsIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsIdPATCH = function actionsIdPATCH(req, res) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Action.actionsIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsPOST = function actionsPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Action.actionsPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsReorderPOST = function actionsReorderPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Action.actionsReorderPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
