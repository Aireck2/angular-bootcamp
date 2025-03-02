import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  items: any[] = [];
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.items.push(i);
    }
  }
}
