import { PercentPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { hlmH4 } from '@spartan-ng/ui-typography-helm';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../services/notification.service';
import { OrdersService } from '../../../../services/orders.service';
import { Product } from '../../../../services/products.service';

@Component({
  selector: 'app-add-cart-dialog',
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
    HlmCardDirective,

    PercentPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './add-cart-dialog.component.html',
})
export class AddCartDialogComponent {
  private _ordersService = inject(OrdersService);
  private _notificationService = inject(NotificationService);

  private _authService = inject(AuthService);
  public showUser = computed(() => !!this._authService.userToken());
  public product = input.required<Product>();
  public user = computed(() => this._authService.userData());
  public hlmH4 = `${hlmH4} mb-4`;

  private _formBuilder = inject(FormBuilder);
  public loading = signal(false);

  public cartForm!: FormGroup;

  finishOrder(ctx: any) {
    this.loading.set(true);

    if (this.cartForm.invalid) {
      this.loading.set(false);
      return;
    }

    if (this.showUser()) {
      this._ordersService
        .createOrder({
          productId: this.product().id,
          userId: this.user()?.id,
          finalPrice: Number(this.product().priceWithDiscount),
          status: 'pending',
        })
        .subscribe({
          next: ({ data }) => {
            this._notificationService.showNotification({
              message: 'Order created successfully!',
              type: 'success',
              duration: 3000,
            });
            ctx.close();
            this.loading.set(false);
            this.cartForm.reset();
          },
          error: (error) => {
            this._notificationService.showNotification({
              message: 'Failed to create order',
              type: 'error',
              description: error?.error?.message?.join?.(', ') ?? '',
              duration: 3000,
            });
          },
        });

      ctx.close();
      this.loading.set(false);
      this.cartForm.reset();
      return;
    }

    this._authService.signup(this.cartForm.value).subscribe({
      next: ({ data }) => {
        this._notificationService.showNotification({
          message: 'Registered successfully!',
          type: 'success',
          duration: 3000,
        });
        this._ordersService
          .createOrder({
            productId: this.product().id,
            userId: data.id,
            finalPrice: Number(this.product().priceWithDiscount),
            status: 'pending',
          })
          .subscribe({
            next: ({ data }) => {
              this._notificationService.showNotification({
                message: 'Order created successfully!',
                type: 'success',
                duration: 3000,
              });
              ctx.close();
              this.loading.set(false);
              this.cartForm.reset();
            },
            error: (error) => {
              this._notificationService.showNotification({
                message: 'Failed to create order',
                type: 'error',
                description: error?.error?.message?.join?.(', ') ?? '',
                duration: 3000,
              });
            },
          });

        ctx.close();
        this.loading.set(false);
        this.cartForm.reset();
      },
      error: (error) => {
        this.loading.set(false);
        this._notificationService.showNotification({
          message: 'Failed to register',
          description: error?.error?.message?.join?.(', ') ?? '',
          type: 'warning',
          duration: 3000,
        });
      },
    });
  }

  ngOnInit() {
    if (this.showUser()) {
      this.cartForm = this._formBuilder.group({
        name: [''],
        email: [''],
        password: [''],
      });
      return;
    }
    this.cartForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
