import { Component, inject } from '@angular/core';
import { GreetingService } from '../greeting.service';

@Component({
  selector: 'ng-module-federation-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
})
export class GreetingComponent {
  private service = inject(GreetingService);
  public from = this.service.from$;
}
