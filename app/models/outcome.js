import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('outcome-status'),
  num: DS.attr('number'),
  name: DS.attr('string'),
  legacyName: DS.attr('string'),
  round: DS.belongsTo('round', {async: true}),
  contest: DS.belongsTo('contest', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

});