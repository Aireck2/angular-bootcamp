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
import { User } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginHistoryService {
  private _http = inject(HttpClient);
  private _apiUrl = `${import.meta.env.NG_APP_API_URL}/api/v1/login-history`;
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
    user: { visible: false, label: 'User' },
    createdAt: { visible: false, label: 'Created At' },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    ...this._brnColumnManager.displayedColumns(),
    // 'actions',
  ]);

  private readonly _displayedIndices = signal({ start: 0, end: 0 });

  private readonly _loginHistory = signal<LoginHistory[]>([]);
  private readonly _pageInfo = signal<PageInfo>(DEFAULT_PAGE_INFO);

  getLoginHistory(
    page: number = 1,
    pageSize: number = this.pageSize()
  ): Observable<{ data: LoginHistory[]; pageInfo: PageInfo }> {
    return this._http.get<{ data: LoginHistory[]; pageInfo: PageInfo }>(
      `${this._apiUrl}?page=${page}&per_page=${pageSize}`
    );
  }

  createLoginHistory(body: any): Observable<{ data: LoginHistory }> {
    return this._http.post<{ data: LoginHistory }>(`${this._apiUrl}`, body);
  }

  public readonly _filteredLoginHistory = computed(() => {
    let tasks = this._loginHistory();
    const taskFilter = this._taskFilter()?.trim()?.toLowerCase();

    // search filter
    if (taskFilter && taskFilter.length > 0) {
      tasks = tasks.filter(
        (a) =>
          a.user.name.toLowerCase().includes(taskFilter) ||
          String(a.id).toLowerCase().includes(taskFilter)
      );
    }
    return tasks;
  });
  protected readonly _filteredSortedPaginatedLoginHistory = computed(() => {
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const tasks = this._filteredLoginHistory();
    return [...tasks].slice(start, end);
  });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => {
      const debouncedFilter = this._debouncedFilter();
      untracked(() => this._taskFilter.set(debouncedFilter ?? ''));
    });
    const columnSettings =
      this._localStorageService.getLoginHistoryTableColumns();
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
  getFilteredSortedPaginatedLoginHistory() {
    return this._filteredSortedPaginatedLoginHistory;
  }
  get loginHistory() {
    return this._loginHistory;
  }
  get pageInfo() {
    return this._pageInfo;
  }
}

export interface LoginHistory {
  userId: number;
  id: number;
  createdAt: string;
  user: User;
}
