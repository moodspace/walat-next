import Component from '@ember/component';

const checker = v => {
  if (v.type === 'sans') {
    if (!v.sansQuestion || !v.sansAnswer) {
      return false;
    }
    return true;
  } else if (v.type === 'fill') {
    if (!v.fillQuestion || !v.fillAnswer) {
      return false;
    }
    let paired = true;
    for (let i = 0; i < v.fillAnswer.length; i++) {
      if (v.fillAnswer[i] === '[' && paired) {
        paired = false;
      } else if (
        v.fillAnswer[i] === ']' &&
        !paired &&
        v.fillAnswer[i - 1] !== '['
      ) {
        paired = true;
      } else if (v.fillAnswer[i] === '[' || v.fillAnswer[i] === ']') {
        return false;
      }
    }
    return paired && v.fillAnswer.includes('[');
  } else if (v.type === 'mulc') {
    if (!v.mulcQuestion || !v.mulcAnswer) {
      return false;
    }
    let marked = true;
    const ansList = v.mulcAnswer.trim().split('\n');
    for (let i = 0; i < ansList.length; i++) {
      if (!ansList[i].startsWith('[T]') && !ansList[i].startsWith('[F]')) {
        marked = false;
      } else if (ansList[i].slice(3).trim().length < 1) {
        marked = false;
      }
    }
    return marked;
  } else {
    return false;
  }
};

export default Component.extend({
  actions: {
    setLink(linked) {
      this.set('linkedQna', linked);
      let newValue = {
        type: this.get('type'),
        linkedQna: linked
      };
      newValue[this.get('type') + 'Question'] = this.get(
        this.get('type') + 'Question'
      );
      newValue[this.get('type') + 'Answer'] = this.get(
        this.get('type') + 'Answer'
      );
      this.updater(newValue, checker(newValue));
    },
    setValueType(t) {
      this.set('type', t);
      this.set('linkedQna', 'false');
      ['sans', 'fill', 'mulc'].forEach(f1 => {
        ['Question', 'Answer'].forEach(f2 => {
          this.set(f1 + f2, undefined);
        });
      });

      this.updater(
        {
          type: t,
          linkedQna: 'false'
        },
        false
      );
    },
    setValueQuestion(q) {
      this.set(this.get('type') + 'Question', q);
      let newValue = { type: this.get('type') };
      newValue[this.get('type') + 'Answer'] = this.get(
        this.get('type') + 'Answer'
      );
      newValue[this.get('type') + 'Question'] = q;
      newValue['linkedQna'] = this.get('linkedQna');
      this.updater(newValue, checker(newValue));
    },
    setValueAnswer(a) {
      this.set(this.get('type') + 'Answer', a);
      let newValue = { type: this.get('type') };
      newValue[this.get('type') + 'Question'] = this.get(
        this.get('type') + 'Question'
      );
      newValue[this.get('type') + 'Answer'] = a;
      newValue['linkedQna'] = this.get('linkedQna');
      this.updater(newValue, checker(newValue));
    }
  }
});
