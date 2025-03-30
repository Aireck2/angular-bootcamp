import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-success-alert',
  standalone: true,
  imports: [
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideCheck })],
  template: `
    <div hlmAlert class="bg-zinc-950 border border-green-500 max-w-[500px]">
      <ng-icon hlm hlmAlertIcon name="lucideCheck" color="green" />
      <h4 hlmAlertTitle>{{ title }}</h4>
      <p hlmAlertDesc>{{ description }}</p>
    </div>
  `,
})
export class AlertSuccessComponent {
  @Input() title = 'Success';
  @Input() description = '';
}
