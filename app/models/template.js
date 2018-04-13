import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  collection: DS.attr(),
});
