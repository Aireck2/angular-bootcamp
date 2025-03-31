import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import {
  lucideCheck,
  lucideCirclePlus,
  lucideLoaderCircle,
  lucideSettings2,
} from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxImports } from '@spartan-ng/ui-checkbox-helm';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
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
import { HlmMenuComponent, HlmMenuItemImports } from '@spartan-ng/ui-menu-helm';
import { HlmPopoverImports } from '@spartan-ng/ui-popover-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { AlertErrorComponent } from '../../../../../../components/alert/error-alert.component';
import { AlertSuccessComponent } from '../../../../../../components/alert/success-alert.component';
import { LocalStorageService } from '../../../../../../services/local-storage.service';
import { ProductsService } from '../../../../../../services/products.service';

@Component({
  selector: 'app-table-actions',
  host: {
    class: 'block',
  },
  imports: [
    HlmButtonDirective,
    FormsModule,
    HlmInputDirective,
    BrnMenuTriggerDirective,
    NgIcon,
    HlmIconDirective,
    HlmMenuComponent,
    HlmMenuItemImports,
    BrnPopoverImports,
    HlmCommandImports,
    BrnCommandImports,
    HlmPopoverImports,
    HlmCheckboxImports,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogContentComponent,
    HlmDialogComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmInputDirective,
    HlmSwitchComponent,
    HlmFormFieldComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    HlmLabelDirective,
    AlertSuccessComponent,
    AlertErrorComponent,
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideLoaderCircle,
      lucideCirclePlus,
      lucideSettings2,
    }),
  ],
  templateUrl: './table-actions.component.html',
})
export class TableActionsComponent {
  private readonly _productsService = inject(ProductsService);
  private readonly _localStorageService = inject(LocalStorageService);

  protected readonly columnManager = this._productsService.getColumnManager();
  protected readonly taskFilter = this._productsService.getTaskFilter();
  protected readonly rawFilterInput = this._productsService.getRawFilterInput();

  onColumnFilterChanged(columnName: string): void {
    this.columnManager.toggleVisibility(columnName as any);
    const isVisible = this.columnManager.isColumnVisible(columnName);
    if (isVisible) {
      this._localStorageService.saveProductsTableColumn(columnName);
    } else {
      this._localStorageService.deleteProductsTableColumn(columnName);
    }
  }
  // create form values
  private _formBuilder = inject(FormBuilder);
  public createLoading = signal(false);
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

  createProduct() {
    this.createLoading.set(true);
    if (this.productForm.invalid) {
      console.log('Form is invalid');
      this.createLoading.set(false);
      return;
    }

    const productData = this.productForm.value;

    this._productsService.createProduct(productData).subscribe({
      next: ({ data }) => {
        this._productsService.getProducts().subscribe(({ data }) => {
          this._productsService.products.set(data);
        });
        this.showSuccessAlert.set(true);
        setTimeout(() => {
          this.showSuccessAlert.set(false);
        }, 3000);

        this.createLoading.set(false);
        this.productForm.reset();
      },
      error: (error) => {
        this.createLoading.set(false);
        this.showErrorAlert.set(true);
        this.error.set({
          title: 'Oops! something has gone wrong',
          description: error?.error?.message?.join(', '),
        });
        setTimeout(() => {
          this.showErrorAlert.set(false);
        }, 3000);
      },
    });
  }
}
