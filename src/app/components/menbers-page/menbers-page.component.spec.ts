import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenbersPageComponent } from './menbers-page.component';

describe('MenbersPageComponent', () => {
  let component: MenbersPageComponent;
  let fixture: ComponentFixture<MenbersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenbersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenbersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
