import {
  Component,
  computed,
  inject,
  signal,
  TrackByFunction,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowUpDown,
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsUp,
  lucideChevronUp,
  lucideCircle,
  lucideCircleCheckBig,
  lucideCircleDashed,
  lucideCircleDot,
  lucideCircleHelp,
  lucideCircleOff,
  lucideCog,
  lucideDot,
  lucideEllipsis,
  lucideLayers,
} from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { BrnTableModule, PaginatorState } from '@spartan-ng/brain/table';
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { TableActionsComponent } from '../../components/table-actions/table-actions.component';
import { StatusIconPipe } from '../../pipes/status-icon.pipe';
import { ProductsService, Task } from './products.service';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    BrnMenuTriggerDirective,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    HlmIconDirective,
    BrnSelectModule,
    HlmSelectModule,
    TableActionsComponent,
    NgIcon,
    StatusIconPipe,
    HlmAvatarImports,
  ],
  providers: [
    provideIcons({
      lucideArrowUpDown,
      lucideChevronDown,
      lucideChevronLeft,
      lucideChevronRight,
      lucideChevronUp,
      lucideChevronsUp,
      lucideCircle,
      lucideCircleCheckBig,
      lucideCircleDashed,
      lucideCircleDot,
      lucideCircleHelp,
      lucideCircleOff,
      lucideCog,
      lucideDot,
      lucideEllipsis,
      lucideLayers,
    }),
  ],

  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly _tasksService = inject(ProductsService);
  protected readonly trackBy: TrackByFunction<Task> = (_: number, p: Task) =>
    p.id;
  protected readonly totalElements = computed(
    () => this._tasksService._filteredTasks().length
  );
  protected readonly availablePageSizes = [5, 10, 20, 10000];
  protected readonly pageSize = signal(this.availablePageSizes[1]); // default to page size 10

  protected readonly allDisplayedColumns =
    this._tasksService.getAllDisplayedColumns();
  protected readonly selected = this._tasksService.getSelected();

  protected readonly isPaymentSelected = (payment: Task) =>
    this._tasksService.isTaskSelected(payment);

  protected readonly tableSource =
    this._tasksService.getFilteredSortedPaginatedTasks();

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._tasksService.setDisplayedIndices(startIndex, endIndex);
}
