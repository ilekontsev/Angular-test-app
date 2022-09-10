import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxChatComponent } from './message-box-chat.component';

describe('MessageBoxChatComponent', () => {
  let component: MessageBoxChatComponent;
  let fixture: ComponentFixture<MessageBoxChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageBoxChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBoxChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
