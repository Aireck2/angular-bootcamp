import { Component, computed, inject, TrackByFunction } from '@angular/core';
import { PaginatorState } from '@spartan-ng/brain/table';
import { TableComponent } from '../../components/table/table.component';
import { ProductsService, Task } from '../products/products.service';

@Component({
  selector: 'app-orders',
  imports: [TableComponent],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  private readonly _ordersService = inject(ProductsService);
  protected readonly trackBy: TrackByFunction<Task> = (_: number, p: Task) =>
    p.id;

  protected readonly columns = computed(() => [
    {
      key: 'id',
      title: 'ID',
      width: '32',
    },
    {
      key: 'name',
      title: 'Product',
      width: '60',
    },
    {
      key: 'status',
      title: 'Status',
      width: '32',
    },
  ]);

  protected readonly totalElements = computed(
    () => this._ordersService._filteredTasks().length
  );

  protected readonly allDisplayedColumns =
    this._ordersService.getAllDisplayedColumns();

  protected readonly tableSource =
    this._ordersService.getFilteredSortedPaginatedTasks();

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) => {
    this._ordersService.setDisplayedIndices(startIndex, endIndex);
  };
}
