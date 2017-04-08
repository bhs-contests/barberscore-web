import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  mus_points: attr('number'),
  per_points: attr('number'),
  sng_points: attr('number'),
  total_points: attr('number'),
  mus_score: attr('number'),
  per_score: attr('number'),
  sng_score: attr('number'),
  total_score: attr('number'),
  permissions: attr(),
});
