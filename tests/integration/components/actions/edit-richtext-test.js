import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('actions/edit-richtext', 'Integration | Component | actions/edit richtext', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{actions/edit-richtext}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#actions/edit-richtext}}
      template block text
    {{/actions/edit-richtext}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
