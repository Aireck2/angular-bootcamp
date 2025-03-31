import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications = signal<Notification[]>([]);

  showNotification(notification: Notification) {
    this.notifications.update((current) => [...current, notification]);

    if (notification.duration) {
      setTimeout(
        () => this.removeNotification(notification),
        notification.duration
      );
    }
  }

  removeNotification(notification: Notification) {
    this.notifications.update((current) =>
      current.filter((n) => n !== notification)
    );
  }
}
