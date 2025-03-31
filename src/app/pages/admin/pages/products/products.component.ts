import { CurrencyPipe, PercentPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
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
import { Title } from '@angular/platform-browser';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilePenLine, lucideTrash2 } from '@ng-icons/lucide';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/brain/alert-dialog';
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
import { hlmMenuItemVariants, HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import {
  Product,
  ProductsService,
} from '../../../../services/products.service';
import { EditProductComponent } from './components/edit-product.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgIcon,
    HlmMenuModule,
    ReactiveFormsModule,

    BrnTableModule,
    BrnSelectModule,
    HlmTableModule,
    HlmButtonModule,
    HlmSelectModule,
    HlmAvatarImports,
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

    TableActionsComponent,
    EditProductComponent,
    CurrencyPipe,
    PercentPipe,
  ],

  providers: [
    provideIcons({
      lucideFilePenLine,
      lucideTrash2,
    }),
  ],

  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle(
      `Products | Admin ${import.meta.env.NG_APP_PREFIX_APP_NAME} `
    );
  }
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({});
  private readonly _productsService = inject(ProductsService);
  protected readonly trackBy: TrackByFunction<Product> = (
    _: number,
    p: Product
  ) => p.id;

  protected readonly totalElements = computed(
    () => this._productsService.pageInfo().total
  );

  protected readonly pageSize = this._productsService.pageSize;
  protected readonly availablePageSizes =
    this._productsService.availablePageSizes;

  protected readonly allDisplayedColumns =
    this._productsService.getAllDisplayedColumns();

  protected readonly tableSource =
    this._productsService.getFilteredSortedPaginatedProducts();

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
    this._productsService.getProducts().subscribe(({ data, pageInfo }) => {
      this._productsService.products.set(data);
      this._productsService.pageInfo.set(pageInfo);
    });
    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      hasDiscount: false,
      images: this._formBuilder.array([this.createImageControl()]),
      percentageDiscount: [null],
    });

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

  updateProduct() {
    if (this.productForm.invalid) {
      console.log('Form is invalid');
    }
  }
  deleteProduct() {
    console.log('delete product');
  }
}
