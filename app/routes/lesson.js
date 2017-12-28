import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  records: service('active-records'),
  model(params) {
    this.get('records').set('lesson', params.lesson_id);
    return RSVP.hash({
      lesson: this.get('store').findRecord('lesson', params.lesson_id),
      exercises: this.get('store').findAll('exercise')
    });
  }
});
