import Component from '@ember/component';
import { v4 } from 'ember-uuid';
import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Component.extend({
  records: service('active-records'),
  store: Ember.inject.service(),
  actions: {
    updateNewLessonName(e) {
      this.set('newLessonName', e.target.value);
    },
    addLesson() {
      // confirm add
      this.get('store')
        .createRecord('lesson', {
          uuid: v4(),
          name: this.get('newLessonName'),
          exercises: []
        })
        .save();
      this.set('newLessonName', '');
    },
    updateNewExerciseName(e) {
      this.set('newExerciseName', e.target.value);
    },
    addExercise() {
      // confirm add
      this.get('store')
        .findRecord('lesson', this.get('records').get('lesson'))
        .then(lesson => {
          const exercise = this.get('store').createRecord('exercise', {
            uuid: v4(),
            name: this.get('newExerciseName'),
            pages: []
          });
          exercise.set('lesson', lesson);
          exercise.save();
          this.set('newExerciseName', '');
        });
    },
    updateNewPageName(e) {
      this.set('newPageName', e.target.value);
    },
    addPage() {
      // confirm add
      this.get('store')
        .findRecord('exercise', this.get('records').get('exercise'))
        .then(exercise => {
          const page = this.get('store').createRecord('page', {
            uuid: v4(),
            name: this.get('newPageName'),
            actions: []
          });
          page.set('exercise', exercise);
          page.save();
          this.set('newPageName', '');
        });
    }
  }
});
