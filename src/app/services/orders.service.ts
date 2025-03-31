import { HttpClient } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { useBrnColumnManager } from '@spartan-ng/brain/table';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DEFAULT_PAGE_INFO, PageInfo } from '../types/page-info.types';
import { PAGE_SIZES } from '../utils/constants';
import { LocalStorageService } from './local-storage.service';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _http = inject(HttpClient);
  private _apiUrl = `${import.meta.env.NG_APP_API_URL}/api/v1/orders`;
  private readonly _localStorageService = inject(LocalStorageService);

  protected readonly _rawFilterInput = signal('');
  protected readonly _taskFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  public readonly pageSize = signal(PAGE_SIZES[1]); // default to page size 10
  public readonly availablePageSizes = PAGE_SIZES;

  protected readonly _brnColumnManager = useBrnColumnManager({
    id: { visible: false, label: 'Id' },
    name: { visible: false, label: 'Product' },
    user: { visible: false, label: 'User' },
    price: { visible: false, label: 'Price' },
    status: { visible: false, label: 'Discount' },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    ...this._brnColumnManager.displayedColumns(),
    // 'actions',
  ]);

  private readonly _displayedIndices = signal({ start: 0, end: 0 });

  private readonly _orders = signal<Order[]>([]);
  private readonly _pageInfo = signal<PageInfo>(DEFAULT_PAGE_INFO);

  getOrders(
    page: number = 1,
    pageSize: number = this.pageSize()
  ): Observable<{ data: Order[]; pageInfo: PageInfo }> {
    return this._http.get<{ data: Order[]; pageInfo: PageInfo }>(
      `${this._apiUrl}?page=${page}&per_page=${pageSize}`
    );
  }

  createOrder(order: any): Observable<{ data: Order }> {
    return this._http.post<{ data: Order }>(`${this._apiUrl}`, order);
  }

  updateOrder({ id, ...order }: Partial<Order>): Observable<{ data: Order }> {
    return this._http.patch<{ data: Order }>(`${this._apiUrl}/${id}`, order);
  }

  public readonly _filteredOrders = computed(() => {
    let tasks = this._orders();
    const taskFilter = this._taskFilter()?.trim()?.toLowerCase();

    // search filter
    if (taskFilter && taskFilter.length > 0) {
      tasks = tasks.filter(
        (a) =>
          a.product.name.toLowerCase().includes(taskFilter) ||
          String(a.id).toLowerCase().includes(taskFilter)
      );
    }
    return tasks;
  });
  protected readonly _filteredSortedPaginatedOrders = computed(() => {
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const tasks = this._filteredOrders();
    return [...tasks].slice(start, end);
  });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => {
      const debouncedFilter = this._debouncedFilter();
      untracked(() => this._taskFilter.set(debouncedFilter ?? ''));
    });
    const columnSettings = this._localStorageService.getOrdersTableColumns();
    for (const column of columnSettings) {
      this._brnColumnManager.setVisible(column as any);
    }
  }

  getColumnManager() {
    return this._brnColumnManager;
  }

  getTaskFilter() {
    return this._taskFilter;
  }

  getRawFilterInput() {
    return this._rawFilterInput;
  }

  getAllDisplayedColumns() {
    return this._allDisplayedColumns;
  }

  setDisplayedIndices(startIndex: number, endIndex: number) {
    this._displayedIndices.set({ start: startIndex, end: endIndex });
  }
  getFilteredSortedPaginatedOrders() {
    return this._filteredSortedPaginatedOrders;
  }
  get orders() {
    return this._orders;
  }
  get pageInfo() {
    return this._pageInfo;
  }
}

export interface Order {
  id: number;
  productId: number;
  userId: number;
  status: 'pending' | 'completed' | 'cancelled'; // Enum-like type for status
  finalPrice: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
