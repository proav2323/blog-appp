import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsListingComponent } from './blogs-listing.component';

describe('BlogsListingComponent', () => {
  let component: BlogsListingComponent;
  let fixture: ComponentFixture<BlogsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogsListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
