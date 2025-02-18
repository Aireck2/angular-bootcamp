import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

export type ProductApi = {
  // id: number;
  // title: string;
  // price: number;
  // description: string;
  // category: string;
  // image: string;
  // rating: {
  //   rate: number;
  //   count: number;
  // };
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  hasDiscount: boolean;
  discount: number;
  priceWithDiscount: number;
};

@Injectable({
  providedIn: "root",
})
export class ApiProductsService {
  private apiUrl = "http://localhost:3000";
  // private apiUrl = "https://fakestoreapi.com";

  constructor(private readonly http: HttpClient) {}

  getAllProducts() {
    return firstValueFrom(
      this.http.get<ProductApi[]>(`${this.apiUrl}/products`)
    );
  }
}
