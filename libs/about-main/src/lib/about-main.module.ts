import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutMainComponent } from './about-main-component/about-main.component';
import {SharedComponentsModule} from "@ng-module-federation/shared-components";

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutMainComponent,
      },
    ]),
  ],
  declarations: [AboutMainComponent],
})
export class AboutMainModule {}
