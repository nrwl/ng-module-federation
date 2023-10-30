import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  private from = new BehaviorSubject<string>('');
  public from$ = this.from.asObservable();
  public updateFrom = (val: string) => this.from.next(val);
}
