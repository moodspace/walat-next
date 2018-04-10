import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  klass: DS.belongsTo('klass'),
  exercises: DS.hasMany('exercise')
});
