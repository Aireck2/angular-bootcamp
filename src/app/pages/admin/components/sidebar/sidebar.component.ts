import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFolderClock,
  lucideReceiptText,
  lucideShoppingCart,
} from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SideButtonComponent } from '../side-button/side-button.component';

interface ListItem {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    NgScrollbarModule,
    NgIcon,
    SideButtonComponent,
    NgClass,
    HlmIconDirective,
  ],
  providers: [
    provideIcons({ lucideShoppingCart, lucideReceiptText, lucideFolderClock }),
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly _router = inject(Router);
  public isSelected = (key: ListItem['key']) => key === this._router.url;
  public discover: ListItem[] = [
    {
      key: '/admin/products',
      label: 'Products',
      icon: 'lucideShoppingCart',
    },
    { key: '/admin/orders', label: 'Orders', icon: 'lucideReceiptText' },
    {
      key: '/admin/login-history',
      label: 'Login History',
      icon: 'lucideFolderClock',
    },
  ];
}
