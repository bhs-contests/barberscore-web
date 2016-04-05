import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(contestant) {
      this.model.set('champion', contestant);
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  contestantSortProperties: ['name:asc',],
  sortedContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
});