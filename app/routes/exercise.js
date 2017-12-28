import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  records: service('active-records'),
  model(params) {
    this.get('records').set('lesson', params.lesson_id);
    this.get('records').set('exercise', params.exercise_id);
    return RSVP.hash({
      exercise: this.get('store').findRecord('exercise', params.exercise_id),
      pages: this.get('store').findAll('page'),
    });
  }
});
