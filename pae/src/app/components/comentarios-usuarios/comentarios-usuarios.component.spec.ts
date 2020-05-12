import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosUsuariosComponent } from './comentarios-usuarios.component';

describe('ComentariosUsuariosComponent', () => {
  let component: ComentariosUsuariosComponent;
  let fixture: ComponentFixture<ComentariosUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
