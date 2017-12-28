import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('actions/edit-show-text', 'Integration | Component | actions/edit show text', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{actions/edit-show-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#actions/edit-show-text}}
      template block text
    {{/actions/edit-show-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
