'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const rseq = require('run-sequence');
const merge = require('merge-stream');
const zip = require('gulp-zip');
const template = require('gulp-template');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');
// const Errors = require('./Errors');

const Model = require('../models.js');

const { DataSource, Action, Page, Exercise, Lesson, Klass, Template } = Model;

DataSource.sync();

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

const generateText = (actions, index, outputDir, cbLine, qnaLinked, qnaIdx) => {
  const action = actions[index];

  const tmplData = {
    content: action.value.html,
    qna: qnaLinked ? actions[qnaIdx].taskName + '.htm' : undefined
  };

  let tmplName = '';
  if (qnaLinked) {
    // half & half
    tmplName = 'text+qna';
    // tmplData.linq = action.
  } else {
    // full width (not simple text)
    tmplName = 'text';
  }
  gulp.task(action.taskName, () => {
    const htm = gulp.src(`templates/${tmplName}.tmpl`)
      .pipe(template(tmplData))
      .pipe(rename(action.taskName + '.htm'))
      .pipe(gulp.dest(outputDir.replace('TYPE', 'texts')));
    return htm;
  });

  rseq(action.taskName, () => {
    cbLine(`show text ${action.taskName}.htm`);
  });
};

const generateImage = (actions, index, outputDir, cbLine, qnaLinked, qnaIdx) => {
  const action = actions[index];

  const tmplData = {
    src: action.value.path,
    qna: qnaLinked ? actions[qnaIdx].taskName + '.htm' : undefined
  };

  let tmplName = '';
  if (qnaLinked) {
    // half & half
    tmplName = 'image+qna';
    // tmplData.linq = action.
  } else {
    // full width (not simple text)
    tmplName = 'image';
  }
  gulp.task(action.taskName, () => {
    const htm = gulp.src(`templates/${tmplName}.tmpl`)
      .pipe(template(tmplData))
      .pipe(rename(action.taskName + '.htm'))
      .pipe(gulp.dest(outputDir.replace('TYPE', 'texts')));
    return htm;
  });

  rseq(action.taskName, () => {
    cbLine(`show text ${action.taskName}.htm`);
  });
};

const generateVideo = (actions, index, outputDir, cbLine, qnaLinked, qnaIdx) => {
  const action = actions[index];

  const tmplData = {
    src: action.value.path,
    qna: qnaLinked ? actions[qnaIdx].taskName + '.htm' : undefined
  };

  let tmplName = '';
  if (qnaLinked) {
    // half & half
    tmplName = 'video+qna';
    // tmplData.linq = action.
  } else {
    // full width (not simple text)
    tmplName = 'video';
  }
  gulp.task(action.taskName, () => {
    const htm = gulp.src(`templates/${tmplName}.tmpl`)
      .pipe(template(tmplData))
      .pipe(rename(action.taskName + '.htm'))
      .pipe(gulp.dest(outputDir.replace('TYPE', 'texts')));
    return htm;
  });

  rseq(action.taskName, () => {
    cbLine(`show text ${action.taskName}.htm`);
  });
};

const generateQna = (actions, index, outputDir, cbLine) => {
  const action = actions[index];
  const tmplData = {};
  gulp.task(action.taskName, () => {
    switch (action.value.type) {
      case 'sans':
        tmplData.qnaq =
          `TypedSet.Question = "${action.value.sansQuestion.replace('"', '\\"')}";`;
        tmplData.qnaa =
          `TypedSet.Comments = "${action.value.sansAnswer.replace('"', '\\"')}";`;
        break;
      case 'fill':
        tmplData.qnaq =
          `TypedSet.Question = "${action.value.fillQuestion.replace('"', '\\"')}";`;
        tmplData.qnaa =
          `TypedSet.Comments = "${action.value.fillAnswer.replace('"', '\\"')}";`;
        break;
      case 'mulc':
        var answers = [];
        var answerKeys = [];
        var correctCount = 0;
        action.value.mulcAnswer.split('\n').forEach((a) => {
          if (a.trim().startsWith('[T]')) {
            answers.push(a.trim().replace(/^\[T\]/, '').trim());
            answerKeys.push('Correct');
            correctCount += 1;
          } else if (a.trim().startsWith('[F]')) {
            answers.push(a.trim().replace(/^\[F\]/, '').trim());
            answerKeys.push('Incorrect');
          }
        });
        var type = correctCount > 1 ? 'CheckBoxSet' : 'RadioButtonSet';
        tmplData.qnaq =
          `${type}.Question = "${action.value.mulcQuestion.replace('"', '\\"')}";`;
        var answersArray = answers.map((a) =>
          `"${a.replace('"', '\\"')}"`).join(',');
        tmplData.qnaa = `${type}.Answers = [${answersArray}];`;
        var answerKeysArray = answerKeys.map((ak) =>
          `"${ak.replace('"', '\\"')}"`).join(',');
        tmplData.qnaa +=
          `${type}.CorrectIncorrect = [${answerKeysArray}];`;
        break;
      default:
    }

    const htm = gulp.src('templates/qna.tmpl')
      .pipe(template(tmplData))
      .pipe(rename(action.taskName + '.htm'))
      .pipe(gulp.dest(outputDir.replace('TYPE', 'texts')));
    const commons = gulp.src('templates/qna/**/*')
      .pipe(gulp.dest(outputDir.replace('TYPE', 'texts')));
    const assets = undefined;
    return merge(htm, commons, assets);
  });

  rseq(action.taskName, () => {
    cbLine('expect Q&A submission');
  });
};

const generateMedia = (actions, index, outputDir, cbLine, page) => {
  const action = actions[index];

  gulp.task(action.taskName, () => {
    const sound = gulp.src(`uploads/${action.value.path}`)
      .pipe(rename(`${page.uuid}.mp3`))
      .pipe(gulp.dest(outputDir.replace('TYPE', 'media')));
    return sound;
  });

  rseq(action.taskName, () => {
    cbLine('play');
  });
};

const transAction = (actions, index, outputDir, cbAction, page) => {
  const action = actions[index];
  const qnaIdx = _.findIndex(actions, { 'type': 'show qna' });
  const qnaLinked = actions[qnaIdx].value.linkedQna && qnaIdx + 1 === index;

  if (action.type === 'hide') {
    switch (action.value.target) {
      case 'directions':
        cbAction('hide directions');
        break;
      case 'text':
        cbAction('hide text');
        break;
      case 'buttons':
        cbAction('hide buttons');
        break;
      default:
    }
  } else if (action.type === 'show text') {
    const simpleText = action.value.html.match(/^<p>[^<>]+<\/p>$/);
    if (action.value.linkedQna || simpleText === null) {
      // not simple text
      generateText(actions, index, outputDir, cbAction, qnaLinked, qnaIdx);
    } else {
      const text = action.value.html.replace('<p>', '').replace('</p>', '');
      cbAction(`show text ${text}`);
    }
  } else if (action.type === 'show image') {
    generateImage(actions, index, outputDir, cbAction, qnaLinked, qnaIdx);
  } else if (action.type === 'show video') {
    generateVideo(actions, index, outputDir, cbAction, qnaLinked, qnaIdx);
  } else if (action.type === 'show qna') {
    generateQna(actions, index, outputDir, cbAction);
  } else if (action.type === 'show directions') {
    cbAction(`show directions ${action.value.text}`);
  } else if (action.type === 'wait') {
    cbAction('wait');
  } else if (action.type === 'play') {
    generateMedia(actions, index, outputDir, cbAction, page);
  } else if (action.type === 'record') {
    switch (action.value.type) {
      case 'fixed':
        cbAction(`record ${action.value.length}`);
        break;
      case 'variable':
        cbAction(`record ${action.value.length} * ${action.value.ratio}`);
        break;
    }
  } else if (action.type === 'pause') {
    cbAction('pause');
  }
};

const transActions = (actions, outputDir, cbPage, page) => {
  const resultLines = [];


  const cbAction = (aIdx) => {
    if (aIdx >= actions.length) {
      cbPage(resultLines);
      return;
    }

    transAction(...[
      actions,
      aIdx,
      outputDir,
      (line) => {
        resultLines.push(line);
        cbAction(aIdx + 1);
      },
      page,
    ]);
  }

  cbAction(0);
};

module.exports = (app) => {
  app.get('/generator', (req, res) => {
    if (!['bak', 'zip'].includes(req.query.format.toLowerCase())) {
      emitError(res, {
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
        emitError(res, {
          code: 404,
          message: 'Cannot find id.',
        });
        return;
      }

      const bakPath = path.join(jobDir,
        `${l.name.replace(' ', '_')}.bak`);
      const bak = fs.createWriteStream(bakPath);

      // write lesson line
      bak.write(`Lesson ${l.name.replace(' ', '_')}\n\n`);

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
            .pipe(zip(`${ziptask}.zip`)).pipe(gulp.dest(
              tempDir)));

          rseq(ziptask, () => {
            // trigger download
            res.download(path.join(tempDir,
              `${ziptask}.zip`), `${l.name}.zip`);
          });
        });
      };

      Exercise.findAll({
        where: {
          lesson: l.id,
        },
        order: [
          ['createdAt']
        ],
      }).then((exercises) => {
        const cbExercise = (eIdx) => {
          if (eIdx >= exercises.length) {
            cbLesson();
            return;
          }

          const e = exercises[eIdx];

          // write exercise line
          bak.write(
            `(start of exercise ${e.name.replace(' ', '_')})\n\n`
          );

          Page.findAll({
            where: {
              exercise: e.id,
            },
            order: [
              ['createdAt']
            ],
          }).then((pages) => {
            const cbPage = (pIdx) => {
              if (pIdx >= pages.length) {
                // write exercise line
                bak.write(
                  `(end of exercise ${e.name.replace(' ', '_')})\n\n`
                );
                cbExercise(eIdx + 1);
                return;
              }

              const p = pages[pIdx];
              // write page line
              bak.write(`\\${p.uuid}\n`);

              Action.findAll({
                where: {
                  page: p.id,
                },
                order: [
                  ['createdAt']
                ],
              }).then((actions) => {
                actions = actions.map((a) => a.dataValues)
                  .map((a) => {
                    a.taskName = rstr.generate();
                    a.value = JSON.parse(a.value);
                    return a;
                  });

                transActions(
                  actions,
                  `${jobDir}/TYPE/${l.name.replace(' ', '_')}/${e.name.replace(' ', '_')}`,
                  (lines) => {
                    bak.write(lines.join('\n') +
                      '\n\n');
                    cbPage(pIdx + 1)
                  },
                  p
                );
              }, (reason) => {
                emitError(res, reason);
              });
            };

            cbPage(0);
          }, (reason) => {
            emitError(res, reason);
          });
        };

        cbExercise(0);
      }, (reason) => {
        emitError(res, reason);
      });
    }, (reason) => {
      emitError(res, reason);
    });
  });
};

const emitError = (res, reason) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(500).end(JSON.stringify({ error: reason || 'Something failed!' }));
}
