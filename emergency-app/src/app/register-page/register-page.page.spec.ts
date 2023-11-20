import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPagePage } from './register-page.page';

describe('RegisterPagePage', () => {
  let component: RegisterPagePage;
  let fixture: ComponentFixture<RegisterPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
