import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private productService: ProductService) {
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

      // Aquí puedes enviar la imagen al servidor (Raspberry Pi)
      // Por ejemplo, usando HttpClient para subir la imagen a un endpoint en la Raspberry Pi
      // this.http.post('http://ip_de_la_raspberry/upload', formData).subscribe(...);

      // Guardamos la URL de la imagen en el servidor
      const imageUrl = `http://172.17.21.253/images/${this.selectedFile.name}`;

      // Creamos un objeto con los datos del formulario
      const newProduct: Product = {
        ...this.productForm.value,
        image: imageUrl,
      };

      // Usamos el servicio para agregar el producto
      this.productService.addProduct(newProduct);

      // Reiniciamos el formulario
      this.productForm.reset();
      this.selectedFile = null;
    } else {
      console.log('Formulario inválido o no se seleccionó una imagen');
    }
  }
}