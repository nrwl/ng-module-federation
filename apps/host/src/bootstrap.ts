import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { setRemoteDefinitions } from '@nx/angular/mf';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { RemoteManifest } from './environments/remote-manifest';

if (environment.production) {
  enableProdMode();
}
setRemoteDefinitions(RemoteManifest);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
