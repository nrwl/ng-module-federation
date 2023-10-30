import { Component, inject } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'ng-module-federation-about-main',
  templateUrl: './about-main.component.html',
  styleUrls: ['./about-main.component.css'],
})
export class AboutMainComponent {
  public service = inject(AboutService);
}

