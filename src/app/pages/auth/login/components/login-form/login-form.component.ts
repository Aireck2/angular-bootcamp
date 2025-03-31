import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { AlertErrorComponent } from '../../../../../components/alert/error-alert.component';
import { AuthService } from '../../../../../services/auth.service';
import { LoginCredentials } from '../../../../../types/auth.types';
@Component({
  selector: 'app-login-form',
  imports: [
    HlmButtonDirective,
    HlmIconDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmFormFieldModule,
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    AlertErrorComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  protected isLoading = signal(false);
  protected error = signal({
    title: '',
    description: '',
    show: false,
  });
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _fb = inject(FormBuilder).nonNullable;

  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  handleError() {
    this.error.set({
      title: 'Error',
      description: 'Invalid email or password',
      show: true,
    });
    setTimeout(
      () =>
        this.error.set({
          title: 'Error',
          description: 'Invalid email or password',
          show: false,
        }),
      3000
    );
    this.isLoading.set(false);
  }

  async login() {
    this.isLoading.set(true);
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.getRawValue();

      this._authService.login(credentials).subscribe({
        next: ({ data }) => {
          if (!data) {
            this.handleError();
            return;
          }
          this._authService.setValue('adminToken', data.accessToken);
          this._router.navigate(['/admin']);
        },
        error: (error) => {
          this.handleError();
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }
}
