import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-button',
  imports: [],
  host: {
    class: 'block',
  },
  templateUrl: './side-button.component.html',
  styleUrl: './side-button.component.css',
})
export class SideButtonComponent {
  @Input() href: string = '';
}
