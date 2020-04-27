import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoDashboardComponent } from './nuevo-producto-dashboard.component';

describe('NuevoProductoDashboardComponent', () => {
  let component: NuevoProductoDashboardComponent;
  let fixture: ComponentFixture<NuevoProductoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoProductoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProductoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
