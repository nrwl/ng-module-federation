import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AboutService {

  private content = new BehaviorSubject<string>('')
  public content$ = this.content.asObservable();
  public updateContent = (val: string) => this.content.next(val);
}

