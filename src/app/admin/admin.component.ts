import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private http: HttpClient // Añadir HttpClient aquí
  ) {
    // Creamos el formulario con validaciones
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      category: ['', Validators.required],
      sale: [false],
      image: [''],
    });
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      // Enviar la imagen al servidor en la Raspberry Pi
      this.http.post('http://172.17.21.253:3000/upload', formData).subscribe(
        (response: any) => {
          // Usar la URL devuelta por el servidor
          const imageUrl = response.path;
          
          // Crear un objeto con los datos del formulario
          const newProduct: Product = {
            ...this.productForm.value,
            image: imageUrl,
          };

          // Usar el servicio para agregar el producto
          this.productService.addProduct(newProduct);

          // Reiniciar el formulario
          this.productForm.reset();
          this.selectedFile = null;
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );
    } else {
      console.log('Formulario inválido o no se seleccionó una imagen');
    }
  }
}