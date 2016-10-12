import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('restaurant-comments', 'Integration | Component | restaurant comments', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{restaurant-comments}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#restaurant-comments}}
      template block text
    {{/restaurant-comments}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
