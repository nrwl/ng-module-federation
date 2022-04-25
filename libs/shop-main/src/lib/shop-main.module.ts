import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from "@ng-module-federation/shared-components";
import {RouterModule} from "@angular/router";
import {ShopMainComponent} from "./shop-main-component/shop-main.component";

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShopMainComponent,
      },
    ]),
  ],
  declarations: [ShopMainComponent],
})
export class ShopMainModule {}
