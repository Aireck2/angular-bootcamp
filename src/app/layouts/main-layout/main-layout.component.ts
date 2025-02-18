import { Component } from "@angular/core";
import { AlertEmojisPipe } from "../../app.component";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: "app-main-layout",
  imports: [AlertEmojisPipe, RouterOutlet, MatTabsModule],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.css",
})
export class MainLayoutComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedTab(event.urlAfterRedirects);
      }
    });
  }
  selectedTab: number = 0;
  navigateToTab(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(["/"]);
        break;
      // case 1:
      //   this.router.navigate(["/about"]);
      //   break;
      case 1:
        this.router.navigate(["/products"]);
        break;
    }
  }
  private updateSelectedTab(url: string) {
    if (url.includes("/")) {
      this.selectedTab = 0;
    } else if (url.includes("/products")) {
      this.selectedTab = 2;
    }
  }
}
