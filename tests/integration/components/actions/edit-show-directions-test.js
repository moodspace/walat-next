import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('actions/edit-show-directions', 'Integration | Component | actions/edit show directions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{actions/edit-show-directions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#actions/edit-show-directions}}
      template block text
    {{/actions/edit-show-directions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
