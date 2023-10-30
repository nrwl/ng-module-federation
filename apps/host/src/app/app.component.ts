import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GreetingService } from '@ng-module-federation/shared-components';
import { tap } from 'rxjs';

@Component({
  selector: 'ng-module-federation-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy{
  title = 'host';
  private service = inject(GreetingService);
  private route = inject(Router);
  page$ = this.route.events.pipe(
    tap((event) => {
      if (event instanceof NavigationEnd) {
        this.service.updateFrom(event.url
          .replace('/', '')
          .replace(/^[a-z]/, x => x.toUpperCase())
        );
      }
    })
  ).subscribe();

  ngOnDestroy(){
    this.page$.unsubscribe();
  }
}
