import { Component } from "@angular/core";
import { AlertEmojisPipe } from "../../app.component";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: "app-main-layout",
  imports: [
    AlertEmojisPipe,
    RouterOutlet,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.css",
})
export class MainLayoutComponent {
  searchQuery: string = "";

  onSearch() {
    console.log("Searching for:", this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = "";
  }
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
