import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReplyCommentsComponent } from './show-reply-comments.component';

describe('ShowReplyCommentsComponent', () => {
  let component: ShowReplyCommentsComponent;
  let fixture: ComponentFixture<ShowReplyCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowReplyCommentsComponent]
    });
    fixture = TestBed.createComponent(ShowReplyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
