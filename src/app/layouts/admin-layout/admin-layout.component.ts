import { Component } from "@angular/core";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AvatarComponent } from "../../components/avatar/avatar.component";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrl: "./admin-layout.component.css",
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIcon,
    MatToolbarModule,
    AvatarComponent,
  ],
})
export class AdminLayoutComponent {
  showFiller = false;
}
