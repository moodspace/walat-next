import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  exercise: DS.belongsTo('exercise'),
  actions: DS.hasMany('action')
});
