import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlamoHeaderComponent } from './alamo-header.component';

describe('AlamoHeaderComponent', () => {
  let component: AlamoHeaderComponent;
  let fixture: ComponentFixture<AlamoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlamoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlamoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
