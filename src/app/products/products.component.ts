import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { Component, inject, Input, OnInit, Pipe } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Product, ProductsService } from "../products.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "./product-dialog/product-dialog.component";
import {
  ApiProductsService,
  ProductApi,
} from "../services/api-products.service";

@Pipe({
  standalone: true,
  name: "ellipsis",
})
export class EllipsisPipe {
  transform(value: string, length: number = 20) {
    return value.length > length ? value.substring(0, length) + "..." : value;
  }
}

@Component({
  selector: "app-products",
  imports: [NgFor, CurrencyPipe, EllipsisPipe, RouterLink, MatButtonModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  @Input() action!: () => void;
  handleCart = () => {
    console.log("Product added to cart!");
    this.action();
  };

  //   // en la clase
  // productosApi: ProductApi[] = [];
  // // en el constructor
  // private readonly apiProductsService: ApiProductsService
  // // en el ngOnInit
  // this.productosApi = await this.apiProductsService.getAllProducts();

  dialog = inject(MatDialog);
  productsService = inject(ProductsService);
  products: Product[] = this.productsService.getProducts();

  productsApiService = inject(ApiProductsService);
  productsApi: ProductApi[] = [];

  async ngOnInit() {
    this.productsApi = await this.productsApiService.getAllProducts();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        animal: "unicorn",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.products = this.productsService.getProductos();
        console.log("Products after dialog:", this.products);
      }
    });
  }
}
