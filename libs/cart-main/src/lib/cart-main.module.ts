import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponentsModule} from "@ng-module-federation/shared-components";
import {CartMainComponent} from "./cart-main-component/cart-main.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CartMainComponent,
            },
        ]),
    ],
    declarations: [CartMainComponent],
})
export class CartMainModule {
}
