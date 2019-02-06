import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSidemenuComponent } from './invoice-sidemenu.component';

describe('InvoiceSidemenuComponent', () => {
  let component: InvoiceSidemenuComponent;
  let fixture: ComponentFixture<InvoiceSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
