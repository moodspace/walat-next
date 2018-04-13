'use strict';

var utils = require('../utils/writer.js');
var Template = require('../service/TemplateService');

module.exports.templatesGET = function templatesGET(req, res) {
  Template.templatesGET()
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.templatesIdDELETE = function templatesIdDELETE(req, res) {
  var id = req.swagger.params['id'].value;
  Template.templatesIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.templatesIdGET = function templatesIdGET(req, res) {
  var id = req.swagger.params['id'].value;
  Template.templatesIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.templatesIdPATCH = function templatesIdPATCH(req, res) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Template.templatesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.templatesPOST = function templatesPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Template.templatesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
