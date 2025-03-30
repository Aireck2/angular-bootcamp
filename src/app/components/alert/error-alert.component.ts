import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTriangleAlert } from '@ng-icons/lucide';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideTriangleAlert })],
  template: `
    <div
      hlmAlert
      variant="destructive"
      class="bg-zinc-950 border border-red-500 max-w-[500px]"
    >
      <ng-icon hlm hlmAlertIcon name="lucideTriangleAlert" color="red" />
      <h4 hlmAlertTitle>{{ title }}</h4>
      <p hlmAlertDesc>{{ description }}</p>
    </div>
  `,
})
export class AlertErrorComponent {
  @Input() title = 'Unexpected Error';
  @Input() description = 'Something went wrong! Please try reloading the page.';
}
