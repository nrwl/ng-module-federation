import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

@NgModule({
  imports: [
    RemoteEntryComponent,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        loadChildren: () => import('@ng-module-federation/about-main').then((m) => m.AboutMainModule)
      }
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
