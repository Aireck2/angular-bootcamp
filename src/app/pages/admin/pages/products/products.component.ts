import { NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  TrackByFunction,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilePenLine, lucideTrash2 } from '@ng-icons/lucide';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/brain/alert-dialog';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { BrnTableModule, PaginatorState } from '@spartan-ng/brain/table';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
} from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldComponent } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { hlmMenuItemVariants, HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { PAGE_SIZES } from '../../../../utils/constants';
import { TableActionsComponent } from '../../components/table-actions/table-actions.component';
import { ProductsService, Task } from './products.service';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    BrnSelectModule,
    HlmSelectModule,
    TableActionsComponent,
    HlmAvatarImports,
    NgIcon,
    HlmInputDirective,
    HlmSwitchComponent,
    HlmFormFieldComponent,
    NgIf,
    ReactiveFormsModule,
    HlmLabelDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogContentComponent,
    HlmDialogComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,

    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,
  ],

  providers: [
    provideIcons({
      lucideFilePenLine,
      lucideTrash2,
    }),
  ],

  templateUrl: './products.component.html',
})
export class ProductsComponent {
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({});
  private readonly _productsService = inject(ProductsService);
  protected readonly trackBy: TrackByFunction<Task> = (_: number, p: Task) =>
    p.id;

  protected readonly totalElements = computed(
    () => this._productsService._filteredTasks().length
  );
  protected readonly columns = this._productsService.columns;

  protected readonly allDisplayedColumns =
    this._productsService.getAllDisplayedColumns();

  protected readonly tableSource =
    this._productsService.getFilteredSortedPaginatedTasks();

  public readonly pageSize = signal(PAGE_SIZES[1]); // default to page size 10

  protected readonly availablePageSizes = PAGE_SIZES;

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._productsService.setDisplayedIndices(startIndex, endIndex);

  // create form values
  private _formBuilder = inject(FormBuilder);
  productForm!: FormGroup;

  createImageControl(): FormControl<string> {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|gif)$/),
    ]) as FormControl<string>;
  }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      hasDiscount: false,
      images: this._formBuilder.array([
        this.createImageControl(), // Initialize with one valid input
      ]),
      percentageDiscount: [''],
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

  createProduct() {
    console.log('create product');
    console.log('Form Data:', this.productForm.value);
  }

  deleteProduct() {
    console.log('delete product');
  }
}
