import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

const PRODUCTS_SETTINGS_KEY = 'products-settings';
const ORDERS_SETTINGS_KEY = 'orders-settings';
const LOGIN_HISTORY_SETTINGS_KEY = 'login-history-settings';

const DEFAULT_PRODUCTS_TABLE_COLUMNS = [
  'id',
  'name',
  'description',
  'price',
  'percentageDiscount',
  'priceWithDiscount',
  'images',
];

const DEFAULT_ORDERS_TABLE_COLUMNS = ['id', 'name', 'user', 'price', 'status'];
const DEFAULT_LOGIN_HISTORY_TABLE_COLUMNS = ['id', 'user', 'createdAt'];

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
    ordersTable: {
      selectedColumns:
        this.getSelectedColumnsSettings(ORDERS_SETTINGS_KEY) ??
        DEFAULT_ORDERS_TABLE_COLUMNS,
    },
    loginHistoryTable: {
      selectedColumns:
        this.getSelectedColumnsSettings(ORDERS_SETTINGS_KEY) ??
        DEFAULT_LOGIN_HISTORY_TABLE_COLUMNS,
    },
  };
  saveLoginHistoryTableColumn(value: any): void {
    this._settings.loginHistoryTable.selectedColumns.push(value);
    this.updateSettings(
      LOGIN_HISTORY_SETTINGS_KEY,
      this._settings.loginHistoryTable
    );
  }

  deleteLoginHistoryTableColumn(value: any): void {
    this._settings.loginHistoryTable.selectedColumns =
      this._settings.loginHistoryTable.selectedColumns.filter(
        (column: any) => column !== value
      );
    this.updateSettings(
      LOGIN_HISTORY_SETTINGS_KEY,
      this._settings.loginHistoryTable
    );
  }

  getLoginHistoryTableColumns(): string[] {
    return this._settings.loginHistoryTable.selectedColumns;
  }

  saveOrdersTableColumn(value: any): void {
    this._settings.ordersTable.selectedColumns.push(value);
    this.updateSettings(ORDERS_SETTINGS_KEY, this._settings.ordersTable);
  }

  deleteOrdersTableColumn(value: any): void {
    this._settings.ordersTable.selectedColumns =
      this._settings.ordersTable.selectedColumns.filter(
        (column: any) => column !== value
      );
    this.updateSettings(ORDERS_SETTINGS_KEY, this._settings.ordersTable);
  }

  getOrdersTableColumns(): string[] {
    return this._settings.ordersTable.selectedColumns;
  }

  saveProductsTableColumn(value: any): void {
    this._settings.productsTable.selectedColumns.push(value);
    this.updateSettings(PRODUCTS_SETTINGS_KEY, this._settings.productsTable);
  }

  deleteProductsTableColumn(value: any): void {
    this._settings.productsTable.selectedColumns =
      this._settings.productsTable.selectedColumns.filter(
        (column: any) => column !== value
      );
    this.updateSettings(PRODUCTS_SETTINGS_KEY, this._settings.productsTable);
  }

  getProductsTableColumns(): string[] {
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
