import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model() {
    return this.get('store').query('convention', {
      'assignments__person__user': this.get('currentUser.user.id'),
      'assignments__category': 5,
      'page_size': 100,
      'status__lt': 95,
    });
  },
});
