import { Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";

import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ProductsService } from "../../products.service";
import { NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-product-dialog",
  imports: [
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: "./product-dialog.component.html",
  styleUrl: "./product-dialog.component.css",
})
export class ProductDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  productForm: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private productoService: ProductsService
  ) {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      description: [""],
      imgUrl: [""],
      isOferta: [false],
      porcentajeOferta: [0],
    });
  }
  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = {
        id: Date.now(),
        ...this.productForm.value,
      };
      this.productoService.addProduct(newProduct);
      this.dialogRef.close(true);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
