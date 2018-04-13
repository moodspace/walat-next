import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  records: service('active-records'),
  selected: service('selected-records'),
  model() {
    this.get('selected').set('klasses', []);
    return RSVP.hash({
      klasses: this.get('store').findAll('klass')
    });
  }
});
