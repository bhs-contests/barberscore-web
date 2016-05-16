import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  performanceSortProperties: ['slot', 'performer.total_score:desc',],
  sortedPerformances: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
  isEditing: false,
  isRaw: false,
  actions: {
    sortBy(performanceSortProperties) {
      this.set('performanceSortProperties', [performanceSortProperties]);
    },
    editOrder() {
      this.set('isEditing', true);
    },
    saveOrder() {
      let children = this.get('model.performances');
      children.forEach(function(item) {
        item.save();
      });
      this.set('isEditing', false);
    },
    cancelOrder() {
      let children = this.get('model.performances');
      children.forEach(function(item) {
        item.rollbackAttributes();
      });
      this.set('isEditing', false);
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        let slot = item.get('slot');
        console.log('Slot %@: %@ %@'.fmt(index+1, slot));
        item.set('slot', index+1);
      });
    },
    saveDate(start, end) {
      this.model.set('date.lower', start);
      this.model.set('date.upper', end);
      this.model.save();
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
    deletePerformance(performance) {
      performance.destroyRecord();
    },
    drawRound() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.draw()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      this.model.reload();
    },
    resortRound() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.resort()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      this.model.reload();
    },
    startRound() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.start()
      .then((response) => {
        this.store.pushPayload('round', response);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    finishRound() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.finish()
      .then((response) => {
        this.store.pushPayload('round', response);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    promoteRound() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.promote()
      .then((response) => {
        this.store.pushPayload('round', response);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    moveTop(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_top()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').sortBy('performance.slot');
      });
    },
    moveUp(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');

      performance.move_up()
      .then(() => {
        flashMessages.success('Success');
        let reloaded =  this.get('model.performances').map( performance => performance.reload() );
        return Ember.RSVP.all(reloaded);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    moveDown(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_down()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').sortBy('performance.slot');
      });
    },
    moveBottom(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_bottom()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      performance.reload();
    },
    scratch(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.scratch()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').removeObject(performance);
      });
    },
  },
});