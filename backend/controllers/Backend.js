'use strict';

var utils = require('../utils/writer.js');
var Backend = require('../service/BackendService');

module.exports.actionsGET = function actionsGET(req, res, next) {
  Backend.actionsGET()
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsIdDELETE = function actionsIdDELETE(req, res, next) {
  var id = req.swagger.params['id'].value;
  Backend.actionsIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsIdGET = function actionsIdGET(req, res, next) {
  var id = req.swagger.params['id'].value;
  Backend.actionsIdGET(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsIdPATCH = function actionsIdPATCH(req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.actionsIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.actionsPOST = function actionsPOST(req, res, next) {
  var body = req.swagger.params['body'].value;
  Backend.actionsPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesGET = function exercisesGET(req, res, next) {
  var include = req.swagger.params['include'].value;
  Backend.exercisesGET(include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdDELETE = function exercisesIdDELETE(req, res, next) {
  var id = req.swagger.params['id'].value;
  Backend.exercisesIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdGET = function exercisesIdGET(req, res, next) {
  var id = req.swagger.params['id'].value;
  var include = req.swagger.params['include'].value;
  Backend.exercisesIdGET(id, include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdPATCH = function exercisesIdPATCH(req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.exercisesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesIdReorderPOST = function exercisesIdReorderPOST(req,
  res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.exercisesIdReorderPOST(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.exercisesPOST = function exercisesPOST(req, res, next) {
  var body = req.swagger.params['body'].value;
  Backend.exercisesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesGET = function klassesGET(req, res, next) {
  var include = req.swagger.params['include'].value;
  Backend.klassesGET(include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesIdDELETE = function klassesIdDELETE(req, res, next) {
  var id = req.swagger.params['id'].value;
  Backend.klassesIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesIdGET = function klassesIdGET(req, res, next) {
  var id = req.swagger.params['id'].value;
  var include = req.swagger.params['include'].value;
  Backend.klassesIdGET(id, include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesIdPATCH = function klassesIdPATCH(req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.klassesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.klassesPOST = function klassesPOST(req, res, next) {
  var body = req.swagger.params['body'].value;
  Backend.klassesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsGET = function lessonsGET(req, res, next) {
  var include = req.swagger.params['include'].value;
  Backend.lessonsGET(include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdDELETE = function lessonsIdDELETE(req, res, next) {
  var id = req.swagger.params['id'].value;
  Backend.lessonsIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdGET = function lessonsIdGET(req, res, next) {
  var id = req.swagger.params['id'].value;
  var include = req.swagger.params['include'].value;
  Backend.lessonsIdGET(id, include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdPATCH = function lessonsIdPATCH(req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.lessonsIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsIdReorderPOST = function lessonsIdReorderPOST(req, res,
  next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.lessonsIdReorderPOST(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.lessonsPOST = function lessonsPOST(req, res, next) {
  var body = req.swagger.params['body'].value;
  Backend.lessonsPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesGET = function pagesGET(req, res, next) {
  var include = req.swagger.params['include'].value;
  Backend.pagesGET(include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesIdDELETE = function pagesIdDELETE(req, res, next) {
  var id = req.swagger.params['id'].value;
  Backend.pagesIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesIdGET = function pagesIdGET(req, res, next) {
  var id = req.swagger.params['id'].value;
  var include = req.swagger.params['include'].value;
  Backend.pagesIdGET(id, include)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesIdPATCH = function pagesIdPATCH(req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Backend.pagesIdPATCH(id, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.pagesPOST = function pagesPOST(req, res, next) {
  var body = req.swagger.params['body'].value;
  Backend.pagesPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
