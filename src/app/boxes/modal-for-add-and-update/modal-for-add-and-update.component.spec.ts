import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForAddAndUpdateComponent } from './modal-for-add-and-update.component';

describe('ModalForAddAndUpdateComponent', () => {
  let component: ModalForAddAndUpdateComponent;
  let fixture: ComponentFixture<ModalForAddAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalForAddAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForAddAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
