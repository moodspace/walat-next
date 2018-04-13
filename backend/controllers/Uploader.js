const multer = require('multer');
const fs = require('fs');
const path = require('path');
const rstr = require('randomstring');

let tempDir = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
tempDir = fs.mkdtempSync(path.join(tempDir, 'walat-'));
const assetDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(assetDir)) {
  fs.mkdirSync(assetDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const rname = rstr.generate();
    cb(null, rname);
  },
});

const mimetypes = {
  'image/jpeg': 'image',
  'image/gif': 'image',
  'image/png': 'image',
  'video/mp4': 'video',
  'video/webm': 'video',
  'video/ogg': 'video',
  'audio/wave': 'sound',
  'audio/wav': 'sound',
  'audio/x-wav': 'sound',
  'audio/x-pn-wav': 'sound',
  'audio/mp3': 'sound',
  'audio/mpeg': 'sound',
  'audio/webm': 'sound',
  'audio/ogg': 'sound',
  'application/ogg': 'sound',
};

const fileFilter = (req, file, cb) => {
  if (mimetypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fieldNameSize: 100,
  fieldSize: 1000000,
  fields: 50,
  fileSize: 500000000,
  files: 50,
  parts: 100,
  headerPairs: 20,
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = (app) => {
  app.post('/uploader', upload.single('data'), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.file) {
      res.status(500).end(JSON.stringify({ error: 'Something failed!' }));
      return;
    }
    const file = req.file;
    // req.body will hold the text fields, if there were any
    // fs.renameSync(file.path, path.join(assetDir, file.filename));
    const fname = file.filename;
    fs.renameSync(file.path, path.join(assetDir, fname));

    res.end(JSON.stringify({
      name: file.originalname,
      path: fname,
      type: mimetypes[file.mimetype],
      attribute: JSON.stringify({
        size: file.size,
        thumb: 'http://via.placeholder.com/350x150',
        mimetype: file.mimetype,
      }),
    }, null, 2));
  });

  app.get('/assets/:path', function(req, res) {
    var options = {
      root: assetDir,
      dotfiles: 'deny',
      headers: {
        'Content-Type': req.query['Content-Type'],
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    var fileName = req.params.path;
    res.sendFile(fileName, options);
  });
}
