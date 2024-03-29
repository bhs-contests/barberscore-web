import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  titles: task(function *() {
    let pdf = yield this.model.titles();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.kind} Titles Report`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});
