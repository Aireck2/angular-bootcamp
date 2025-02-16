import { Injectable } from "@angular/core";

export type Product = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  hasDiscount: boolean;
  percentageDiscount: number;
};

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  products: Product[] = [
    {
      id: "1",
      name: "iPhone 15 Pro",
      price: 999.99,
      imgUrl: "https://m.media-amazon.com/images/I/61lKQWyMdDL._AC_SL1500_.jpg",
      description: "El nuevo iPhone 15 Pro con chip A17 Pro y cámara avanzada.",
      hasDiscount: true,
      percentageDiscount: 10,
    },
    {
      id: "2",
      name: "MacBook Air M2",
      price: 1199.99,
      imgUrl: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
      description:
        "MacBook Air con chip M2, pantalla Liquid Retina y diseño ultrafino.",
      hasDiscount: false,
      percentageDiscount: 0,
    },
    {
      id: "3",
      name: "Sony WH-1000XM5",
      price: 349.99,
      imgUrl: "https://m.media-amazon.com/images/I/81c+9BOQNWL._AC_SL1500_.jpg",
      description:
        "Auriculares con cancelación de ruido líder en la industria.",
      hasDiscount: true,
      percentageDiscount: 15,
    },
    {
      id: "4",
      name: "Samsung Galaxy Watch 6",
      price: 279.99,
      imgUrl: "https://m.media-amazon.com/images/I/61lKQWyMdDL._AC_SL1500_.jpg",
      description:
        "Reloj inteligente con monitoreo de salud y pantalla AMOLED.",
      hasDiscount: false,
      percentageDiscount: 0,
    },
    {
      id: "5",
      name: "Canon EOS R6 Mark II",
      price: 2499.99,
      imgUrl: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
      description: "Cámara sin espejo con sensor full-frame y grabación 4K.",
      hasDiscount: true,
      percentageDiscount: 5,
    },
    {
      id: "6",
      name: "LG UltraGear 32” 4K Monitor",
      price: 699.99,
      imgUrl: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
      description: "Monitor 4K de 32 pulgadas con 144Hz y HDR.",
      hasDiscount: false,
      percentageDiscount: 0,
    },
    {
      id: "7",
      name: "Logitech G Pro X TKL",
      price: 149.99,
      imgUrl: "https://m.media-amazon.com/images/I/81c+9BOQNWL._AC_SL1500_.jpg",
      description:
        "Teclado mecánico gaming con switches intercambiables y RGB.",
      hasDiscount: true,
      percentageDiscount: 8,
    },
    {
      id: "8",
      name: "Secretlab Titan Evo 2022",
      price: 549.99,
      imgUrl: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
      description: "Silla ergonómica premium para gaming y oficina.",
      hasDiscount: false,
      percentageDiscount: 0,
    },
    {
      id: "9",
      name: "iPad Pro 12.9” M2",
      price: 1099.99,
      imgUrl: "https://m.media-amazon.com/images/I/81c+9BOQNWL._AC_SL1500_.jpg",
      description:
        "iPad Pro con chip M2, pantalla Liquid Retina XDR y Face ID.",
      hasDiscount: true,
      percentageDiscount: 12,
    },

    {
      id: "10",
      name: "PlayStation 5",
      price: 499.99,
      imgUrl: "https://m.media-amazon.com/images/I/61lKQWyMdDL._AC_SL1500_.jpg",
      description:
        "Consola de última generación con gráficos impresionantes y SSD ultrarrápido.",
      hasDiscount: false,
      percentageDiscount: 0,
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
  getProductById(id: string): Product {
    return this.products.find((product) => product.id === id)!;
  }
  addProduct(product: Product) {
    this.products.unshift(product);
    console.log("Products in service:", this.products);
  }
}
