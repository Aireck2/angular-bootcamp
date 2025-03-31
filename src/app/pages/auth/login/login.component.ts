import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginFormComponent } from './components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  titleService = inject(Title);
  appName = import.meta.env.NG_APP_PREFIX_APP_NAME;
  constructor() {
    this.titleService.setTitle(
      `Admin Sign-in | ${import.meta.env.NG_APP_PREFIX_APP_NAME}`
    );
  }
}
