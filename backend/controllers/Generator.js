'use strict';

const gulp = require('gulp');
const template = require('gulp-template');
const rename = require('gulp-rename');
const rseq = require('run-sequence');
const merge = require('merge-stream');
const zip = require('gulp-zip');

const render = require('render-quill');
const fs = require('fs');
const path = require('path');
const Errors = require('./Errors');

const Model = require('../models.js');

const {
  DataSource,
  Action,
  Page,
  Exercise,
  Lesson,
  Klass,
  Template
} = Model;

DataSource.sync();

const _ = require('lodash');
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

const generateText = (collection, data, tag, outputDir, qnaTag, cb) => {
  const taskNames = [rstr.generate(), rstr.generate(), rstr.generate(), rstr.generate()];
  let textHtml = '';
  gulp.task(taskNames[0], () => {
    const htm = gulp.src(`dist/assets/templates/text${qnaTag ? '.q' : ''}.tmpl`)
      .pipe(template({
        qnaName: `${collection.page.name}.${qnaTag}.htm`,
        content: textHtml,
      }))
      .pipe(rename(`${collection.page.name}.${tag}.htm`))
      .pipe(gulp.dest(outputDir));
    return merge(htm);
  });

  gulp.task(taskNames[1], () => {
    const videoName = data[tag].video.path.split('/').pop();

    const htm = gulp.src(`dist/assets/templates/waveform${qnaTag ? '.q' : ''}.tmpl`)
      .pipe(template({
        qnaName: `${collection.page.name}.${qnaTag}.htm`,
        videoName,
      }))
      .pipe(rename(`${collection.page.name}.${tag}.htm`))
      .pipe(gulp.dest(outputDir));
    const commons = gulp.src('dist/assets/templates/waveform/**/*')
      .pipe(gulp.dest(outputDir));
    const assets = gulp.src(`dist/assets/uploads/${videoName}`)
      .pipe(gulp.dest(outputDir));
    return merge(htm, commons, assets);
  });

  gulp.task(taskNames[2], () => {
    const videoName = data[tag].video.path.split('/').pop();

    const htm = gulp.src(`dist/assets/templates/video${qnaTag ? '.q' : ''}.tmpl`)
      .pipe(template({
        qnaName: `${collection.page.name}.${qnaTag}.htm`,
        videoName,
      }))
      .pipe(rename(`${collection.page.name}.${tag}.htm`))
      .pipe(gulp.dest(outputDir));
    const commons = gulp.src('dist/assets/templates/video/**/*')
      .pipe(gulp.dest(outputDir));
    const assets = gulp.src(`dist/assets/uploads/${videoName}`)
      .pipe(gulp.dest(outputDir));
    return merge(htm, commons, assets);
  });

  gulp.task(taskNames[3], () => {
    const imageName = data[tag].image.path.split('/').pop();

    const htm = gulp.src(`dist/assets/templates/image${qnaTag ? '.q' : ''}.tmpl`)
      .pipe(template({
        qnaName: `${collection.page.name}.${qnaTag}.htm`,
        imageName,
      }))
      .pipe(rename(`${collection.page.name}.${tag}.htm`))
      .pipe(gulp.dest(outputDir));
    const assets = gulp.src(`dist/assets/uploads/${imageName}`)
      .pipe(gulp.dest(outputDir));
    return merge(htm, assets);
  });

  if (data[tag].mode === 'text') {
    render(data[tag].text, (err, output) => {
      textHtml = output;
      rseq(taskNames[0], () => {
        cb(`show text ${collection.page.name}/${collection.page.name}.${tag}.htm`);
      });
    });
  } else if (data[tag].mode === 'video') {
    if (data[tag].video.isWaveform) {
      rseq(taskNames[1], () => {
        cb(`show text ${collection.page.name}/${collection.page.name}.${tag}.htm`);
      });
    } else {
      rseq(taskNames[2], () => {
        cb(`show text ${collection.page.name}/${collection.page.name}.${tag}.htm`);
      });
    }
  } else if (data[tag].mode === 'image') {
    rseq(taskNames[3], () => {
      cb(`show text ${collection.page.name}/${collection.page.name}.${tag}.htm`);
    });
  }
};

const generateQna = (collection, data, tag, outputDir, cb) => {
  const taskName = rstr.generate();
  let qnaQuestion = '';
  let qnaAnswer = '';
  let qnaChoices = '[]';
  let qnaCorrectness = '[]';
  let qnaType = -1;

  gulp.task(taskName, () => {
    const tmplData = {
      qnaQuestion0: '',
      qnaQuestion1: '',
      qnaQuestion2: '',
      qnaQuestion3: '',
      qnaAnswer0: '',
      qnaAnswer1: '',
      qnaChoices2: '[]',
      qnaChoices3: '[]',
      qnaCorrectness2: '[]',
      qnaCorrectness3: '[]',
    };
    tmplData[`qnaQuestion${qnaType}`] = qnaQuestion;
    tmplData[`qnaAnswer${qnaType}`] = qnaAnswer;
    tmplData[`qnaChoices${qnaType}`] = qnaChoices;
    tmplData[`qnaCorrectness${qnaType}`] = qnaCorrectness;

    const htm = gulp.src('dist/assets/templates/qna.tmpl')
      .pipe(template(tmplData))
      .pipe(rename(`${collection.page.name}.${tag}.htm`))
      .pipe(gulp.dest(outputDir));
    const commons = gulp.src('dist/assets/templates/qna/**/*')
      .pipe(gulp.dest(outputDir));
    const assets = undefined;
    return merge(htm, commons, assets);
  });

  qnaType = data[tag].type;

  // Checkbox type
  if (qnaType === 2) {
    if (_.countBy(data[tag].choices, 'isCorrect').Correct > 1) {
      qnaType = 3;
    }
  }

  if (qnaType === 0) {
    // Short answer
    qnaQuestion = data[tag].question;
    qnaAnswer = data[tag].answer;
    rseq(taskName, () => {
      cb('expect Q&A submission');
    });
  } else if (qnaType === 1) {
    // Filling blanks
    qnaQuestion = data[tag].question;
    qnaAnswer = data[tag].answer;
    rseq(taskName, () => {
      cb('expect Q&A submission');
    });
  } else if (qnaType === 2) {
    // Multiple choice
    qnaQuestion = data[tag].question;
    qnaAnswer = '';
    qnaChoices = JSON.stringify(data[tag].choices.map(c => c.value));
    qnaCorrectness = JSON.stringify(data[tag].choices.map(c => (c.isCorrect ? 'Correct' : 'Incorrect')));
    rseq(taskName, () => {
      cb('expect Q&A submission');
    });
  }
};

const generateMedia = (collection, data, tag, outputDir, cb) => {
  const taskName = rstr.generate();

  gulp.task(taskName, () => {
    const sound = gulp.src(`dist/assets/uploads/${data[tag].path.split('/').pop()}`)
      .pipe(rename(`${collection.page.name}.mp3`))
      .pipe(gulp.dest(outputDir));
    return sound;
  });

  rseq(taskName, () => {
    cb('play');
  });
};

const transLine = (collection, line, data, tag, outputDir, qnaTag, isExtraFiles, cbLine) => {
  let cmd = '';
  if (/^show text/.test(line)) {
    cmd = 'show text';
  } else if (/^show directions/.test(line)) {
    cmd = 'show directions';
  } else if (/^hide/.test(line)) {
    cmd = 'hide';
  } else if (/^pause/.test(line)) {
    cmd = 'pause';
  } else if (/^wait/.test(line)) {
    cmd = 'wait';
  } else if (/^play/.test(line)) {
    cmd = 'play';
  } else if (/^record/.test(line)) {
    cmd = 'record';
  } else if (/^expect Q&A submission/.test(line)) {
    cmd = 'expect Q&A submission';
  }

  console.log('processing', tag, ':', data[tag], '...');

  const pageTextDir = path.join(...[
    outputDir,
    'texts',
    collection.lesson.name,
    collection.exercise.name.replace(' ', '_'),
  ]);

  const pageMediaDir = path.join(...[
    outputDir,
    'media',
    collection.lesson.name,
    collection.exercise.name.replace(' ', '_'),
  ]);

  switch (cmd) {
    case 'show text':
      if (isExtraFiles) {
        generateText(collection, data, tag, pageTextDir, qnaTag, cbLine);
      } else {
        cbLine(`show text ${collection.page.name}/${collection.page.name}.${tag}.htm`);
      }
      break;
    case 'show directions':
      cbLine(`show directions ${data[tag].directions}`);
      break;
    case 'hide':
      cbLine(`hide ${data[tag].element}`);
      break;
    case 'pause':
      cbLine(`pause ${data[tag].length}`);
      break;
    case 'play':
      if (isExtraFiles) {
        generateMedia(collection, data, tag, pageMediaDir, cbLine);
      } else {
        cbLine('play');
      }
      break;
    case 'record':
      cbLine([
        'record ',
        (data[tag].isFixed ? data[tag].length : data[tag]['length-var']),
        ' * ',
        data[tag]['length-multiplier'],
      ].join(''));
      break;
    case 'expect Q&A submission':
      generateQna(collection, data, tag, pageTextDir, cbLine);
      break;
    default:
      cbLine();
      return cmd;
  }

  return '';
};

const transScript = (collection, outputDir, isExtraFiles, bakFile, cbPage) => {
  const script = _.isEmpty(collection.page.script) ? '' : collection.page.script;
  const data = JSON.parse(collection.page.fields);

  const s = script.split('\n');
  const qnaTags = [];

  const resultLines = [];

  const cbLine = (lIdx) => {
    if (lIdx >= s.length) {
      // complete page generation
      bakFile.write(`${resultLines.join('\n')}\n\n`);
      cbPage();
      return;
    }


    const line = s[lIdx];
    const matches = line.match(/@\w+\s*$/g);
    let tag = '';
    if (!_.isNull(matches)) {
      tag = matches[0].replace(/^@/g, '').trim();
      if (/^expect Q&A submission/.test(line)) {
        qnaTags.push(tag);
      }
    }

    if (_.isNull(matches)) {
      resultLines.push(line);
      cbLine(lIdx + 1);
    } else {
      transLine(...[
        collection,
        line,
        data,
        tag,
        outputDir,
        qnaTags[qnaTags.length - 1],
        isExtraFiles,
        () => {
          resultLines.push(line);
          cbLine(lIdx + 1);
        },
      ]);
    }
  };

  cbLine(0);
};

module.exports = (app) => {
  app.get('/generator', (req, res) => {
    if (!['bak', 'zip'].includes(req.query.format)) {
      Errors.emitHttpError(res, {
        code: 400,
        message: 'You must specify a format.',
      });
      return;
    }

    const jobId = rstr.generate();
    const jobDir = path.join(tempDir, `job-${jobId}`);
    fs.mkdirSync(jobDir);

    Lesson.find({
      where: {
        id: req.query.lid,
      },
    }).then((l) => {
      if (l === null) {
        Errors.emitHttpError(res, {
          code: 404,
          message: 'Cannot find id.',
        });
        return;
      }

      const bakPath = path.join(jobDir, `${l.name}.bak`);
      const bak = fs.createWriteStream(bakPath);

      // write lesson line
      bak.write(`Lesson ${l.name}\n\n`);

      const cbLesson = () => {
        // complete lesson generation
        bak.end(() => {
          // generate wal script only for download
          if (req.query.format === 'bak') {
            res.download(bakPath);
            return;
          }

          // generate zip for download
          const ziptask = rstr.generate();
          gulp.task(ziptask, () => gulp.src(`${jobDir}/**/*`)
            .pipe(zip(`${ziptask}.zip`)).pipe(gulp.dest(tempDir)));

          rseq(ziptask, () => {
            // trigger download
            res.download(path.join(tempDir, `${ziptask}.zip`), `${l.name}.zip`);
          });
        });
      };

      Exercise.findAll({
        where: {
          lessonId: l.id,
        },
      }).then((exercises) => {
        const cbExercise = (eIdx) => {
          if (eIdx >= exercises.length) {
            cbLesson();
            return;
          }

          const e = exercises[eIdx];

          // write exercise line
          bak.write(`(start of exercise ${e.name.replace(' ', '_')})\n\n`);

          Page.findAll({
            where: {
              exerciseId: e.id,
            },
          }).then((pages) => {
            const cbPage = (pIdx) => {
              if (pIdx >= pages.length) {
                // write exercise line
                bak.write(`(end of exercise ${e.name.replace(' ', '_')})\n\n`);
                cbExercise(eIdx + 1);
                return;
              }

              const p = pages[pIdx];

              // write page line
              bak.write(`\\${p.name}\n`);

              const collection = {
                lesson: l,
                exercise: e,
                page: p,
              };
              transScript(...[
                collection,
                jobDir,
                req.query.format === 'zip',
                bak,
                () => cbPage(pIdx + 1),
              ]);
            };

            cbPage(0);
          }, (reason) => {
            Errors.emitDbError(res, reason);
          });
        };

        cbExercise(0);
      }, (reason) => {
        Errors.emitDbError(res, reason);
      });
    }, (reason) => {
      Errors.emitDbError(res, reason);
    });
  });
};
