import { Component, computed, inject } from '@angular/core';
import {
  Notification,
  NotificationService,
} from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 space-y-2 z-[2000]">
      @for (notification of notifications(); track notification.message) {
      <div
        [class]="getNotificationClass(notification.type)"
        class="p-4 rounded-lg shadow-lg text-white max-w-sm"
      >
        <span class="font-semibold">{{ notification.message }}</span>
        @if(notification.description){
        <p class="text-sm opacity-80">
          {{ notification.description }}
        </p>
        }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .success {
        background-color: #28a745;
      }
      .error {
        background-color: #dc3545;
      }
      .warning {
        background-color: #ffc107;
        color: black;
      }
      .info {
        background-color: #17a2b8;
      }
    `,
  ],
})
export class NotificationComponent {
  private notificationService = inject(NotificationService); // ✅ Using `inject()`
  notifications = computed(() => this.notificationService.notifications()); // ✅ Reactivity with signals

  close(notification: Notification) {
    this.notificationService.removeNotification(notification);
  }

  getNotificationClass(type: string) {
    return type;
  }
}
