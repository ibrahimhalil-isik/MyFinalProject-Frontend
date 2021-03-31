import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = []; 
  dataLoaded = false;
  filterText=""
  
  constructor(private ProductService:ProductService,
     private activatedRoute:ActivatedRoute, 
     private toastrService:ToastrService,
     private cartService:CartService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }
      else{
        this.getProducts()
      }      
    })

  }

  getProducts() {
    this.ProductService.getProducts().subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId:number) {
    this.ProductService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  addToCart(product:Product){
    this.toastrService.success(product.productName + "sepete eklendi.", "Sepete Eklendi")
    this.cartService.addToCart(product);
  }
}