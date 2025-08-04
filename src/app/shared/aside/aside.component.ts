import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category/category.service';

import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ViewsService } from '../../core/services/views/views.service';
import { ViewProdModel } from '../../core/models/views.model';
import { VariablesService } from '../../core/services/variables/variables.service';


@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {
  categoryVar: Category[] = [];

  viewsProducts: ViewProdModel[] = [];
  filterProducts: ViewProdModel[] = [];


  constructor(
    private categoryService: CategoryService,
    private ViewProd: ViewsService,
    private variablesService: VariablesService

  ) {

  }

  ngOnInit(): void {
    this.categoryService.getAllCategorys()
      .subscribe(arg => this.categoryVar = arg);
  }

  refreshPageDashboard(val: number) {
    //console.log(val)
    this.variablesService.cleanViewProduct();
    //this.router.navigateByUrl('/login', { skipLocationChange: false }) //navegacion url
    this.ViewProd.getAllProductsCatStatus().
      subscribe(prods => {

        this.viewsProducts = prods; //charge all products in variable
        let len = this.filterProducts.length;
        this.filterProducts.splice(0,len); // Limpiar el array

        if (val == 0) {
          //console.log("All products",val);
          this.variablesService.setViewProduct(this.viewsProducts);
        } else {
          //console.log("Filter",val)
          let c = 0;
          while (c < this.viewsProducts.length) {

            if (this.viewsProducts[c].category_id == val) {

              this.filterProducts.push(this.viewsProducts[c]);

            }
            c++;
          }
         // console.log(this.filterProducts);
          this.variablesService.setViewProduct(this.filterProducts);
        }
      });
  }
}
