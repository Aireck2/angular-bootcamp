import { Component, Pipe } from "@angular/core";

import { RouterOutlet } from "@angular/router";

@Pipe({
  standalone: true,
  name: "alertEmojis",
})
export class AlertEmojisPipe {
  transform(value: string) {
    return `🚨 ${value} 🚨`;
  }
}

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Angular bootcamp";
  cartLength = 0;
  handleCart = () => {
    console.log("parent!");
    this.cartLength++;
  };
}
