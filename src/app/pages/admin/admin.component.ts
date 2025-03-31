import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCog,
  lucideLayers,
  lucideLogOut,
  lucideUser,
} from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AbbreviationPipe } from './pipes/abbrevation.pipe';

@Component({
  selector: 'app-admin',
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuModule,
    HlmButtonModule,
    HlmIconDirective,
    BrnSelectModule,
    HlmSelectModule,
    NgIcon,
    HlmAvatarImports,
    SidebarComponent,
    RouterOutlet,
    AbbreviationPipe,
  ],
  providers: [
    provideIcons({ lucideLogOut, lucideUser, lucideCog, lucideLayers }),
  ],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  public user: any | null = null;

  ngOnInit() {
    this._authService.getMe().subscribe({
      next: ({ data }) => {
        this.user = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  routeName = () => {
    const routeName = this._router.url.split('/').at(-1);
    return routeName;
  };

  logoutAdmin() {
    this._authService.logoutAdmin();
    this._router.navigate(['/login']);
  }
}
