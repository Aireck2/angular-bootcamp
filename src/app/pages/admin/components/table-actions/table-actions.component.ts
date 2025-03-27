import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronsUp,
  lucideChevronUp,
  lucideCircle,
  lucideCircleCheckBig,
  lucideCircleDashed,
  lucideCircleDot,
  lucideCircleHelp,
  lucideCircleOff,
  lucideCirclePlus,
  lucideGlobe,
  lucideMicVocal,
  lucideSearch,
  lucideSettings2,
  lucideX,
} from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxImports } from '@spartan-ng/ui-checkbox-helm';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmMenuComponent, HlmMenuItemImports } from '@spartan-ng/ui-menu-helm';
import { HlmPopoverImports } from '@spartan-ng/ui-popover-helm';
import { LocalStorageService } from '../../pages/products/local-storage.service';
import { ProductsService } from '../../pages/products/products.service';

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
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideChevronDown,
      lucideChevronLeft,
      lucideChevronUp,
      lucideChevronsUp,
      lucideCircle,
      lucideCircleCheckBig,
      lucideCircleDashed,
      lucideCircleDot,
      lucideCircleHelp,
      lucideCircleOff,
      lucideCirclePlus,
      lucideGlobe,
      lucideMicVocal,
      lucideSearch,
      lucideSettings2,
      lucideX,
    }),
  ],
  templateUrl: './table-actions.component.html',
  styleUrl: './table-actions.component.css',
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
      this._localStorageService.saveTaskTableColumn(columnName);
    } else {
      this._localStorageService.deleteTaskTableColumn(columnName);
    }
  }
}
