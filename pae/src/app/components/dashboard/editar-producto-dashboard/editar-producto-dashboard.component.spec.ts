import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoDashboardComponent } from './editar-producto-dashboard.component';

describe('EditarProductoDashboardComponent', () => {
  let component: EditarProductoDashboardComponent;
  let fixture: ComponentFixture<EditarProductoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProductoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProductoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
