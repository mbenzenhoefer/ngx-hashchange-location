import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const handleHashChange = evt => {
  /*tslint:disable:no-console*/
  console.log('hashchange event triggered!');
  console.log(evt);
  /*tslint:enable:no-console*/
};

window.addEventListener('hashchange', handleHashChange);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  /*tslint:disable:no-console*/
  .catch(err => console.error(err));
