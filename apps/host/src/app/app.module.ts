import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { loadRemoteModule } from '@nx/angular/mf';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'cart',
          loadChildren: () =>
            loadRemoteModule('cart','./Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'shop',
          loadChildren: () =>
            loadRemoteModule('shop','./Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'about',
          loadChildren: () =>
            loadRemoteModule('about','./Module').then((m) => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
