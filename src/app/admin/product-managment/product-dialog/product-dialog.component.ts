import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      name: [data.name || '', Validators.required],
      description: [data.description || ''],
      price: [data.price || 0, [Validators.required, Validators.min(0)]],
      stock: [data.stock || 0, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.productForm.valid) {
      const product = new Product({
        id: this.data.id,
        ...this.productForm.value
      });
      this.dialogRef.close(product);
    }
  }
}
