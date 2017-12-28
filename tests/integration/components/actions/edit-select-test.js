import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('actions/edit-select', 'Integration | Component | actions/edit select', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{actions/edit-select}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#actions/edit-select}}
      template block text
    {{/actions/edit-select}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
