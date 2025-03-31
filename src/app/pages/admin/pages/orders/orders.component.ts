import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { BrnTableModule, PaginatorState } from '@spartan-ng/brain/table';
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { hlmMenuItemVariants, HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { Order, OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [
    FormsModule,
    HlmMenuModule,
    ReactiveFormsModule,

    BrnTableModule,
    BrnSelectModule,
    HlmTableModule,
    HlmButtonModule,
    HlmSelectModule,
    HlmAvatarImports,

    CurrencyPipe,
  ],

  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle(
      `Orders | Admin ${import.meta.env.NG_APP_PREFIX_APP_NAME} `
    );
  }
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({});
  private readonly _ordersService = inject(OrdersService);
  protected readonly trackBy: TrackByFunction<Order> = (_: number, p: Order) =>
    p.id;

  protected readonly totalElements = computed(
    () => this._ordersService.pageInfo().total
  );

  protected readonly pageSize = this._ordersService.pageSize;
  protected readonly availablePageSizes =
    this._ordersService.availablePageSizes;

  protected readonly allDisplayedColumns =
    this._ordersService.getAllDisplayedColumns();

  protected readonly tableSource =
    this._ordersService.getFilteredSortedPaginatedOrders();

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._ordersService.setDisplayedIndices(startIndex, endIndex);

  ngOnInit() {
    this._ordersService.getOrders().subscribe(({ data, pageInfo }) => {
      this._ordersService.orders.set(data);
      this._ordersService.pageInfo.set(pageInfo);
    });
  }
}
