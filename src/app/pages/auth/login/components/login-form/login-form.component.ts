import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { AuthService } from '../../../../../service/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    HlmInputDirective,
    FormsModule,
    HlmLabelDirective,
    HlmFormFieldModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  public isLoading = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  async login() {
    await this.send();
    this.authService.login('admin-secret-token'); // Simulating login
    this.router.navigate(['/admin']); // Redirect to admin panel
  }
  async send() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }
}
