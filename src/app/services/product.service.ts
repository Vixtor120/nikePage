import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
  sale: boolean;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Usamos BehaviorSubject para guardar los productos
  private products = new BehaviorSubject<Product[]>([]);
  // Observable para que otros componentes puedan suscribirse
  currentProducts = this.products.asObservable();

  // Método para agregar un producto
  addProduct(product: Product) {
    const currentProducts = this.products.value;
    const updatedProducts = [...currentProducts, product];
    this.products.next(updatedProducts);
  }

  // Método para obtener los productos
  getProducts(): Product[] {
    return this.products.value;
  }
}