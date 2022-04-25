import {Component} from '@angular/core';
import {Input} from "@angular/core";

@Component({
  selector: 'ng-module-federation-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
})
export class GreetingComponent {
  @Input() from = "";
}
