import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('global-breadcrumb', 'Integration | Component | global breadcrumb', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{global-breadcrumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#global-breadcrumb}}
      template block text
    {{/global-breadcrumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
