import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  selected: service('selected-records'),
  actions: {
    toggleSelect(id) {
      let selectedRecords = this.get('selected').get('klasses').slice(0);
      if (selectedRecords.includes(id)) {
        selectedRecords = selectedRecords.filter((e) => {
          return e !== id;
        });
        this.get('selected').set('klasses', selectedRecords);
      } else {
        selectedRecords.push(id);
        this.get('selected').set('klasses', selectedRecords);
      }
      this.set('hasSelected', selectedRecords.length > 0);
    }
  },
});
