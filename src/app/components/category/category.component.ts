import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  dataLoaded = false;

  constructor(private CategoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.CategoryService.getCategories().subscribe(response=>{
      this.categories = response.data
      this.dataLoaded = true;
    })
  }
}