import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
  HlmCarouselNextComponent,
  HlmCarouselPreviousComponent,
} from '@spartan-ng/ui-carousel-helm';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    HlmButtonDirective,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    LoginDialogComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private _router = inject(Router);
  public navItems = [
    {
      label: 'Inicio',
      key: '/home',
    },
    {
      label: 'Productos',
      key: '/products',
    },
  ];
  navigate(route: string) {
    this._router.navigate([route]);
  }
  items = Array.from({ length: 10 }, (_, i) => i + 1);
  // plugins = [Autoplay({ delay: 5000 })];
  plugins = [];
}
