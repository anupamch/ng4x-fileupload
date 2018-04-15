import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng4xfileuploadComponent } from './ng4xfileupload.component';

describe('Ng4xfileuploadComponent', () => {
  let component: Ng4xfileuploadComponent;
  let fixture: ComponentFixture<Ng4xfileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng4xfileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng4xfileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
