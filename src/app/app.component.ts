import { Component, Pipe, PipeTransform } from "@angular/core";
import { ProductsComponent } from "./products/products.component";

@Pipe({
  standalone: true,
  name: "alertEmojis",
})
export class AlertEmojisPipe {
  transform(value: string) {
    return ` 🚨${value} 🚨`;
  }
}

@Component({
  selector: "app-root",
  imports: [
    ProductsComponent,
    AlertEmojisPipe,
    // NgFor,
    // NgIf,
    // NgStyle,
    // NgSwitch,
    // NgSwitchCase,
    // NgSwitchDefault,
    // UpperCasePipe,
    // LowerCasePipe,
    // DatePipe,
    // CurrencyPipe,
    // MiPipe,
    // OfuscarPipe,
    // PercentPipe,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Angular bootcamp";
  nombre: string = "Erick";
  imagen = `https://robohash.org/${this.nombre}`;
  colores: string[] = ["rojo", "verde", "azul", "amarillo"];
  hasNotification: boolean = true;
  colorBackground: string = "purple";
  userRole: string = "hacker";
  today = new Date();
  salary = 1234.21;
  percentage = 0.5221;
}
