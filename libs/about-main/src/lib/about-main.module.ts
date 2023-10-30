import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutMainComponent } from './about-main-component/about-main.component';
import {SharedComponentsModule} from "@ng-module-federation/shared-components";
import {AboutService} from './about.service';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        outlet: 'about',
        component: AboutMainComponent,
      },
    ]),
  ],
  providers: [AboutService],
  declarations: [AboutMainComponent],
})
export class AboutMainModule {}
