import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lesson-navlist', 'Integration | Component | lesson navlist', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lesson-navlist}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lesson-navlist}}
      template block text
    {{/lesson-navlist}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
