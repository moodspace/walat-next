import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  type: DS.attr('string'),
  value: DS.attr(),
  page: DS.belongsTo('page')
});
