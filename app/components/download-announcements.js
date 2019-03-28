import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  announcements: task(function *() {
    let pdf = yield this.model.announcements();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.kind} Announcements`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
  }).drop(),
});
