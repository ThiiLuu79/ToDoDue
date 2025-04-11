import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelptextComponent } from './helptext.component';

describe('HelptextComponent', () => {
  let component: HelptextComponent;
  let fixture: ComponentFixture<HelptextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelptextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelptextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
