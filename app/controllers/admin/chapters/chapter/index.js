import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveChapter() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        flashMessages.success("Saved" );
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    }
  },
});
