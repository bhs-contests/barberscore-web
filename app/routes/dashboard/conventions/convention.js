// import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('convention', params.convention_id);
  },
  afterModel(model) {
      this.transitionTo('dashboard.conventions.convention.details', model.get('id'));
  }
});