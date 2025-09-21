import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDashComponent } from './content-dash.component';

describe('ContentDashComponent', () => {
  let component: ContentDashComponent;
  let fixture: ComponentFixture<ContentDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentDashComponent]
    });
    fixture = TestBed.createComponent(ContentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
