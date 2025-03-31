import { DatePipe } from '@angular/common';
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
import {
  LoginHistory,
  LoginHistoryService,
} from '../../../../services/login-history.service';

@Component({
  selector: 'app-loginHistory',
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

    DatePipe,
  ],

  templateUrl: './login-history.component.html',
})
export class LoginHistoryComponent implements OnInit {
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle(
      `LoginHistory | Admin ${import.meta.env.NG_APP_PREFIX_APP_NAME} `
    );
  }
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({});
  private readonly _loginHistoryService = inject(LoginHistoryService);
  protected readonly trackBy: TrackByFunction<LoginHistory> = (
    _: number,
    p: LoginHistory
  ) => p.id;

  protected readonly totalElements = computed(
    () => this._loginHistoryService.pageInfo().total
  );

  protected readonly pageSize = this._loginHistoryService.pageSize;
  protected readonly availablePageSizes =
    this._loginHistoryService.availablePageSizes;

  protected readonly allDisplayedColumns =
    this._loginHistoryService.getAllDisplayedColumns();

  protected readonly tableSource =
    this._loginHistoryService.getFilteredSortedPaginatedLoginHistory();

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._loginHistoryService.setDisplayedIndices(startIndex, endIndex);

  ngOnInit() {
    this._loginHistoryService
      .getLoginHistory()
      .subscribe(({ data, pageInfo }) => {
        this._loginHistoryService.loginHistory.set(data);
        this._loginHistoryService.pageInfo.set(pageInfo);
      });
  }
}
