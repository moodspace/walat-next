import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  selected: service('selected-records'),
  actions: {
    sortStartAction: function() {
      this.set('oldOrder', this.get('model').pages.map((e) => e.id));
    },
    sortEndAction: function() {
      this.set('newOrder', this.get('model').pages.map((e) => e.id));
      console.log(this.get('oldOrder'), this.get('newOrder'));
    },
    toggleSelect(id) {
      let selectedRecords = this.get('selected').get('pages').slice(0);
      if (selectedRecords.includes(id)) {
        selectedRecords = selectedRecords.filter((e) => {
          return e !== id;
        });
        this.get('selected').set('pages', selectedRecords);
      } else {
        selectedRecords.push(id);
        this.get('selected').set('pages', selectedRecords);
      }
    }
  }
});
