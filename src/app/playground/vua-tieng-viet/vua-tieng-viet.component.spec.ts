import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuaTiengVietComponent } from './vua-tieng-viet.component';

describe('VuaTiengVietComponent', () => {
  let component: VuaTiengVietComponent;
  let fixture: ComponentFixture<VuaTiengVietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuaTiengVietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuaTiengVietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
