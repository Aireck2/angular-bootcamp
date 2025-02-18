import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log(this.email, this.password);
    if (
      this.authService.login({
        email: this.email,
        password: this.password,
      })
    ) {
      this.router.navigate(["/admin"]);
    } else {
      this.errorMessage = "Invalid credentials";
    }
  }
}
