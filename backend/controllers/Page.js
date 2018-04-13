'use strict';

var utils = require('../utils/writer.js');
var Page = require('../service/PageService');

module.exports.pagesGET = function pagesGET(req, res) {
  var exercise = req.swagger.params['exercise'].value;
  Page.pagesGET(exercise)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesIdDELETE = function pagesIdDELETE(req, res) {
  var id = req.swagger.params['id'].value;
  Page.pagesIdDELETE(id)
    .then(function(response) {
      res.status(204);
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesIdGET = function pagesIdGET(req, res) {
  var id = req.swagger.params['id'].value;
  Page.pagesIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesIdPATCH = function pagesIdPATCH(req, res) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Page.pagesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesPOST = function pagesPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Page.pagesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesReorderPOST = function pagesReorderPOST(req, res) {
  var body = req.swagger.params['body'].value;
  Page.pagesReorderPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
