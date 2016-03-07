import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Quartet',
      2: 'Chorus',
      10: 'Seniors',
      20: 'Collegiate',
      30: 'Novice',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Quartet': 1,
      'Chorus': 2,
      'Seniors': 10,
      'Collegiate': 20,
      'Novice': 30,
    };
    return map[deserialized];
  }
});
