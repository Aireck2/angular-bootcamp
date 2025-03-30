import { Component, computed, inject, TrackByFunction } from '@angular/core';
import { PaginatorState } from '@spartan-ng/brain/table';
import { TableComponent } from '../../components/table/table.component';
import { ProductsService, Task } from '../products/products.service';

@Component({
  selector: 'app-login-history',
  imports: [TableComponent],
  templateUrl: './login-history.component.html',
})
export class LoginHistoryComponent {
  private readonly _loginHistoryService = inject(ProductsService);
  protected readonly trackBy: TrackByFunction<Task> = (_: number, p: Task) =>
    p.id;

  protected readonly totalElements = computed(
    () => this._loginHistoryService._filteredTasks().length
  );

  protected readonly allDisplayedColumns =
    this._loginHistoryService.getAllDisplayedColumns();

  protected readonly tableSource =
    this._loginHistoryService.getFilteredSortedPaginatedTasks();

  protected readonly columns = computed(() => [
    {
      key: 'id',
      title: 'ID',
      width: '32',
    },
    {
      key: 'name',
      title: 'Products',
      width: '60',
    },
    {
      key: 'status',
      title: 'status',
      width: '32',
    },
  ]);

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) => {
    this._loginHistoryService.setDisplayedIndices(startIndex, endIndex);
  };
}
