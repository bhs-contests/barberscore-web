import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'kind',
  ],
  kind: null,
  // kind: Ember.computed(
  //   'kindOut',
  //   function(){
  //     let k = this.get('kindOut');
  //     console.log(k);
  //     let map = {
  //       'Organization': 1,
  //       'District': 11,
  //       'Noncompetitive': 12,
  //       'Affiliate': 13,
  //       'Division': 21,
  //       'Quartet': 31,
  //       'Chorus': 32,
  //       'Very Large Quartet': 33,
  //     };
  //     return map[k];
  //   }
  // ),
  sortProperties: [
    'name',
    'kind',
    'status',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  // kindOptions: [
  //   'Organization',
  //   'District',
  //   'Noncompetitive',
  //   'Affiliate',
  //   'Division',
  //   'Quartet',
  //   'Chorus',
  //   'Very Large Quartet',
  // ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Seniors',
    'Collegiate',
    'Youth',
  ],

  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],

  roundOptions: [
    1,
    2,
    3,
  ],

  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__in': '1,11,21', //TODO Hardcoded
      'page_size': 100,
    });
  }),
  entitySortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entitySortProperties'
  ),
  openModal: false,

  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
    createAward(){
      let award = this.get('store').createRecord('award', {
        name: this.get('name'),
        kind: this.get('kind'),
        season: this.get('season'),
        rounds: this.get('rounds'),
        is_qualifier: this.get('is_qualifier'),
        entity: this.get('entity'),
      });
      award.save()
      .then(() => {
        this.get('flashMessages').success('Success');
        this.set('name', null);
        this.set('kind', null);
        this.set('season', null);
        this.set('rounds', null);
        this.set('is_qualifier', null);
        this.set('entity', null);
        this.set('openModal', false);
        this.transitionToRoute('admin.award-manager.award', this.get('model'));
      })
      .catch(() => {
        award.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearAward() {
        this.set('name', null);
        this.set('kind', null);
        this.set('season', null);
        this.set('rounds', null);
        this.set('is_qualifier', null);
        this.set('entity', null);
      this.set('openModal', false);
    },
    deleteAward(award){
      award.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
