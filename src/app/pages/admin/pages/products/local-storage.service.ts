import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

const PRODUCTS_SETTINGS_KEY = 'products-settings';

const DEFAULT_PRODUCTS_TABLE_COLUMNS = ['id', 'name', 'status'];

/**
 * Manages local storage settings for the task table.
 * It persists the users selected columns.
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _settings = {
    productsTable: {
      selectedColumns:
        this.getSelectedColumnsSettings(PRODUCTS_SETTINGS_KEY) ??
        DEFAULT_PRODUCTS_TABLE_COLUMNS,
    },
  };

  saveTaskTableColumn(value: any): void {
    this._settings.productsTable.selectedColumns.push(value);
    this.updateSettings(PRODUCTS_SETTINGS_KEY, this._settings.productsTable);
  }

  deleteTaskTableColumn(value: any): void {
    this._settings.productsTable.selectedColumns =
      this._settings.productsTable.selectedColumns.filter(
        (column: any) => column !== value
      );
    this.updateSettings(PRODUCTS_SETTINGS_KEY, this._settings.productsTable);
  }

  getTaskTableColumns(): string[] {
    return this._settings.productsTable.selectedColumns;
  }

  private updateSettings(key: string, settings: any) {
    if (this._isBrowser) {
      localStorage.setItem(key, JSON.stringify(settings));
    }
  }

  private getSelectedColumnsSettings(key: string) {
    if (!this._isBrowser) {
      return DEFAULT_PRODUCTS_TABLE_COLUMNS;
    }
    const settings = localStorage.getItem(key);
    if (!settings) {
      return undefined;
    }
    return JSON.parse(settings).selectedColumns;
  }
}
