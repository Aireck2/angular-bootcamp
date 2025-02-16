import { Component, Pipe } from "@angular/core";
import { ProductsComponent } from "./products/products.component";
import { MatTabsModule } from "@angular/material/tabs";

import {
  NavigationEnd,
  provideRouter,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";

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
  imports: [
    ProductsComponent,
    AlertEmojisPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabsModule,
  ],
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

  selectedTab: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedTab(event.urlAfterRedirects);
      }
    });
  }

  navigateToTab(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(["/"]);
        break;
      case 1:
        this.router.navigate(["/about"]);
        break;
      case 2:
        this.router.navigate(["/products"]);
        break;
    }
  }

  private updateSelectedTab(url: string) {
    if (url.includes("/")) {
      this.selectedTab = 0;
    } else if (url.includes("/about")) {
      this.selectedTab = 1;
    } else if (url.includes("/productos")) {
      this.selectedTab = 2;
    }
  }
}
