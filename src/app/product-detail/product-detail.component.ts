import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product, ProductsService } from "../products.service";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-product-detail",
  imports: [MatButton],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export class ProductDetailComponent {
  productId: string = "";
  productsService = inject(ProductsService);
  product: Product | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.route.params.subscribe((params) => {
      console.log(params["id"]);
      this.productId = params["id"];
      this.product = this.productsService.getProductById(params["id"]);
    });
  }

  goBack(): void {
    this.router.navigate(["/products"]);
  }
}
