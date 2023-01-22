import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { Product } from './../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+"  symbol
    // @ts-ignore: Object is possibly 'null'
    const theProductId = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    console.log(
      `Adding to cart: ${this.product.name}, ${this.product.unit_price}`
    );
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
