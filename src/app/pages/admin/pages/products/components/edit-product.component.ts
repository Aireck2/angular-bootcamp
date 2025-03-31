import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilePenLine, lucideLoaderCircle } from '@ng-icons/lucide';
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
} from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldComponent } from '@spartan-ng/ui-formfield-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import {
  Product,
  ProductsService,
} from '../../../../../services/products.service';

@Component({
  selector: 'app-edit-product',
  imports: [
    NgIf,
    NgFor,
    NgIcon,
    FormsModule,
    HlmInputDirective,
    HlmSwitchComponent,
    HlmFormFieldComponent,
    HlmButtonDirective,
    HlmIconDirective,
    ReactiveFormsModule,
    HlmLabelDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogContentComponent,
    HlmDialogComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
  ],

  providers: [
    provideIcons({
      lucideLoaderCircle,
      lucideFilePenLine,
    }),
  ],

  template: ` <hlm-dialog align="end">
    <button
      hlmBtn
      [disabled]="updateLoading()"
      variant="ghost"
      size="icon"
      class="cursor-pointer"
      brnDialogTrigger
    >
      @if(updateLoading()){
      <ng-icon
        hlm
        name="lucideLoaderCircle"
        size="sm"
        class="animate-spin"
      ></ng-icon>
      } @else {
      <ng-icon hlm size="sm" name="lucideFilePenLine"></ng-icon>
      }
    </button>
    <hlm-dialog-content class="min-w-[450px]" *brnDialogContent="let ctx">
      <hlm-dialog-header>
        <h2 hlmDialogTitle>Edit Product</h2>
      </hlm-dialog-header>
      <form [formGroup]="productForm" (ngSubmit)="updateProduct(); ctx.close()">
        <hlm-form-field class="pb-4">
          <label hlmLabel class="sr-only" for="email">Name</label>
          <input
            hlmInput
            class="w-full"
            placeholder="Name"
            type="text"
            id="name"
            formControlName="name"
          />
        </hlm-form-field>
        <hlm-form-field class="pb-4">
          <label hlmLabel class="sr-only" for="description">Description</label>
          <textarea
            hlmInput
            class="w-full"
            placeholder="Description"
            id="description"
            rows="4"
            formControlName="description"
          ></textarea>
        </hlm-form-field>
        <hlm-form-field class="pb-4">
          <label hlmLabel class="sr-only" for="price">Price</label>
          <input
            hlmInput
            class="w-full"
            placeholder="Price"
            type="number"
            id="price"
            formControlName="price"
          />
        </hlm-form-field>
        <div class="flex flex-col gap-4 pb-4">
          <div
            *ngFor="let imageControl of images.controls; let i = index"
            class="grid grid-cols-4 gap-4 items-center"
          >
            <input
              hlmInput
              type="text"
              [formControl]="imageControl"
              placeholder="Enter image URL"
              class="col-span-3"
            />
            <button
              hlmBtn
              class="cursor-pointer"
              variant="outline"
              type="button"
              (click)="removeImage(i)"
              [disabled]="images.length === 1"
            >
              ❌
            </button>
          </div>

          <button
            hlmBtn
            class="cursor-pointer"
            variant="outline"
            type="button"
            (click)="addImage()"
            [disabled]="images.length >= maxImages"
          >
            ➕ Add Image
          </button>
        </div>

        <div class="w-full pb-4 pt-1">
          <label class="flex items-center max-w-fit" hlmLabel for="hasDiscount">
            <hlm-switch
              class="mr-2"
              id="hasDiscount"
              formControlName="hasDiscount"
            />
            Has Discount?
          </label>
        </div>

        <hlm-form-field
          *ngIf="productForm.get('hasDiscount')?.value"
          class="pb-4"
        >
          <label hlmLabel class="sr-only" for="percentageDiscount"
            >Percentage discount</label
          >
          <input
            hlmInput
            formControlName="percentageDiscount"
            class="w-full"
            placeholder="Percentage discount"
            type="number"
            id="percentageDiscount"
            min="1"
            max="100"
          />
        </hlm-form-field>

        <hlm-dialog-footer>
          <button hlmBtn type="submit">Save changes</button>
        </hlm-dialog-footer>
      </form>
    </hlm-dialog-content>
  </hlm-dialog>`,
})
export class EditProductComponent {
  public product = input.required<Product>();
  private readonly _productsService = inject(ProductsService);

  // update form values
  private _formBuilder = inject(FormBuilder);
  public updateLoading = signal(false);
  public showSuccessAlert = signal(false);
  public showErrorAlert = signal(false);
  public error = signal({
    title: '',
    description: '',
  });
  productForm!: FormGroup;
  maxImages = 3;

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      hasDiscount: false,
      percentageDiscount: [0],
      images: this._formBuilder.array([
        this.createImageControl(), // Initialize with one valid input
      ]),
    });

    // Dynamically manage the discount field
    this.productForm
      .get('hasDiscount')
      ?.valueChanges.subscribe((hasDiscount) => {
        if (hasDiscount) {
          this.productForm.addControl(
            'percentageDiscount',
            new FormControl('', [
              Validators.required,
              Validators.min(1),
              Validators.max(100),
            ])
          );
        } else {
          this.productForm.removeControl('percentageDiscount');
        }
      });

    this.productForm.patchValue({
      id: this.product().id,
      name: this.product().name,
      description: this.product().description,
      price: this.product().price,
      hasDiscount: this.product().hasDiscount,
      percentageDiscount: this.product().percentageDiscount,
    });
    const imagesArray = this.productForm.get('images') as FormArray;
    imagesArray.clear();

    this.product().images.forEach((imageUrl) => {
      imagesArray.push(this._formBuilder.control(imageUrl));
    });
  }

  get images(): FormArray<FormControl<string>> {
    return this.productForm.get('images') as FormArray<FormControl<string>>;
  }
  createImageControl(): FormControl<string> {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(/https?:\/\/.+\.?(jpg|jpeg|png|gif)?$/),
    ]) as FormControl<string>;
  }

  addImage(url: string = '') {
    if (this.images.length < this.maxImages) {
      const newControl = this.createImageControl();
      this.images.push(newControl);
      newControl.updateValueAndValidity();
    }
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  updateProduct() {
    this.updateLoading.set(true);
    if (this.productForm.invalid) {
      console.log('Form is invalid');
      this.updateLoading.set(false);
      return;
    }

    const productData = this.productForm.value;

    this._productsService
      .updateProduct({
        id: this.product().id,
        ...productData,
        price: Number(productData.price),
      })
      .subscribe({
        next: ({ data }) => {
          this._productsService.getProducts().subscribe(({ data }) => {
            this._productsService.products.set(data);
          });
          this.showSuccessAlert.set(true);
          setTimeout(() => {
            this.showSuccessAlert.set(false);
          }, 3000);

          this.updateLoading.set(false);
        },
        error: (error) => {
          this.updateLoading.set(false);
          this.showErrorAlert.set(true);
          this.error.set({
            title: 'Oops! something has gone wrong',
            description: error?.error?.message?.join?.(', ') ?? error?.message,
          });
          setTimeout(() => {
            this.showErrorAlert.set(false);
          }, 3000);
        },
      });
  }
}
