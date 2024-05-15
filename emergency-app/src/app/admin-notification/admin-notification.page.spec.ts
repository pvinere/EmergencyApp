import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNotificationPage } from './admin-notification.page';

describe('AdminNotificationPage', () => {
  let component: AdminNotificationPage;
  let fixture: ComponentFixture<AdminNotificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
