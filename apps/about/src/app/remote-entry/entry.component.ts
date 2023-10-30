import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ng-module-federation-entry-about',
  template: `<router-outlet name="about"></router-outlet>`,
  standalone: true,
  imports: [RouterModule]
})
export class RemoteEntryComponent {}
