import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  // serialize: function() {
  //   const serialized = this._super(...arguments);
  //   if (typeof serialized.id === 'string') {
  //     serialized.id = parseInt(serialized.id, 10);
  //   }
  //   if (typeof serialized.page === 'string') {
  //     serialized.page = parseInt(serialized.page, 10);
  //   }
  //   if (typeof serialized.exercise === 'string') {
  //     serialized.exercise = parseInt(serialized.exercise, 10);
  //   }
  //   if (typeof serialized.lesson === 'string') {
  //     serialized.lesson = parseInt(serialized.lesson, 10);
  //   }
  //   return serialized;
  // }
});
