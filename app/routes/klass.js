import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  records: service('active-records'),
  model(params) {
    this.get('records').set('klass', params.klass_id);
    return RSVP.hash({
      klass: this.get('store').findRecord('klass', params.klass_id),
      lessons: this.get('store').findAll('lesson')
    });
  }
});
