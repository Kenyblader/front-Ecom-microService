import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagmentComponent } from './product-managment.component';

describe('ProductManagmentComponent', () => {
  let component: ProductManagmentComponent;
  let fixture: ComponentFixture<ProductManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
