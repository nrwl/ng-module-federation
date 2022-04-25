import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMainComponent } from './cart-main.component';

describe('CartMainComponent', () => {
  let component: CartMainComponent;
  let fixture: ComponentFixture<CartMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
