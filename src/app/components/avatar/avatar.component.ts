import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-avatar",
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: "./avatar.component.html",
  styleUrl: "./avatar.component.css",
})
export class AvatarComponent {
  @Input() imageUrl: string = "";
  @Input() name: string = "";
}
