import { Component } from '@angular/core';
import { ViewProdModel } from '../../../core/models/views.model';
import { ViewsService } from '../../../core/services/views/views.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VariablesService } from '../../../core/services/variables/variables.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  colorState: any; //Variable that use colors of product's state

  prods: { item: ViewProdModel, num: number }[] = []; //recibe todos los valores de la lista de la vista
  filterProducts: { item: ViewProdModel, num: number }[] = [];//recibe los valores filtrados de la lista guardada en prods
  p: number = 1;//variable util para el el paginador
  inputValue = "";
  constructor(
    private viewProdService: ViewsService,
    private variableService: VariablesService

  ) {

    viewProdService.getAllProductsCatStatus().subscribe(data => {
      data.forEach((item, index) => {
        this.prods.push({ item, num: index + 1 });
        this.filterProducts.push({ item, num: index + 1 });
      });
    })

    this.colorState = variableService.colorEstado;


  };

  filterProds() {
    if (this.inputValue.length === 0) {
      this.filterProducts = [];
      this.prods.forEach(item => {
        this.filterProducts.push(item);
      });
    } else {
      this.filterProducts = [];
      const v = this.prods.filter(item => item.item.name.toLocaleLowerCase().includes(this.inputValue.toLocaleLowerCase()));
      this.filterProducts.push(...v);
    }
  }


}
