import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCog,
  lucideLogOut,
  lucideShoppingCart,
  lucideUser,
} from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
  HlmCarouselNextComponent,
  HlmCarouselPreviousComponent,
} from '@spartan-ng/ui-carousel-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import Autoplay from 'embla-carousel-autoplay';
import { AuthService } from '../../services/auth.service';
import { Product, ProductsService } from '../../services/products.service';
import { AbbreviationPipe } from '../admin/pipes/abbrevation.pipe';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

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
    ProductCardComponent,
    NgIcon,
    HlmIconDirective,
    BrnSelectModule,
    HlmSelectModule,
    BrnMenuTriggerDirective,
    HlmAvatarImports,
    AbbreviationPipe,
    HlmMenuModule,
  ],
  providers: [
    provideIcons({ lucideShoppingCart, lucideUser, lucideCog, lucideLogOut }),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private _router = inject(Router);
  private titleService = inject(Title);
  private _productsService = inject(ProductsService);
  private _authService = inject(AuthService);
  public user = computed(() => this._authService.userData());
  public showUser = computed(() => !!this._authService.userToken());
  public productsWithDiscount = signal<Product[]>([]);
  public productsAll = signal<Product[]>([]);
  public appName = import.meta.env.NG_APP_PREFIX_APP_NAME;

  constructor() {
    this.titleService.setTitle(
      `Home | ${import.meta.env.NG_APP_PREFIX_APP_NAME}`
    );
  }

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

  plugins = [Autoplay({ delay: 5000 })];

  logoutUser() {
    this._authService.logoutUser();
    this._router.navigate(['/home']);
  }

  ngOnInit(): void {
    if (this.showUser()) {
      this._authService.getMeUser().subscribe({
        next: ({ data }) => {
          this._authService.setValue('userData', JSON.stringify(data));
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    this._productsService.getProducts(1, 100).subscribe(({ data }) => {
      this.productsAll.set(data);
    });
    this._productsService.getProducts(1, 100, true).subscribe(({ data }) => {
      this.productsWithDiscount.set(data);
    });
  }
}
