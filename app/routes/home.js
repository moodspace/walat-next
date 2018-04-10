import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  records: service('active-records'),
  model() {
    return RSVP.hash({
      klasses: this.get('store').findAll('klass')
    });
  }
});
