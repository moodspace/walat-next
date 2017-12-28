import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('asset-thumb-card', 'Integration | Component | asset thumb card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{asset-thumb-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#asset-thumb-card}}
      template block text
    {{/asset-thumb-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
