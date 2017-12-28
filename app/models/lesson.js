import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  exercises: DS.hasMany('exercise')
});
