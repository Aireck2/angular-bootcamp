import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-login-dialog',
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmFormFieldModule,
    NgIcon,
    HlmIconDirective,

    ReactiveFormsModule,
  ],
  templateUrl: './login-dialog.component.html',
})
export class LoginDialogComponent implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _notificationService = inject(NotificationService);
  private _fb = inject(FormBuilder);

  loginForm!: FormGroup;

  login(ctx: any) {
    this._authService.login(this.loginForm.value).subscribe({
      next: ({ data }) => {
        if (!data) {
          return;
        }
        this._authService.setValue('userToken', data.accessToken);
        this._authService.getMeUser().subscribe({
          next: ({ data }) => {
            this._authService.setValue('userData', JSON.stringify(data));
          },
          error: (error) => {
            console.log(error);
          },
        });
        this._router.navigate(['/']);
        this._notificationService.showNotification({
          message: 'Logged in successfully!',
          type: 'success',
          duration: 3000,
        });
        ctx.close();
      },
      error: (error) => {
        ctx.close();
        this._notificationService.showNotification({
          message: 'Failed to login',
          description: error?.error?.message?.join?.(', ') ?? '',
          type: 'warning',
          duration: 3000,
        });
      },
    });
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
