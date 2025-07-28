import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ViewsService } from '../core/services/views/views.service';
import { CarProdModel, ViewProdModel } from '../core/models/views.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { VariablesService } from '../core/services/variables/variables.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  formSend = new FormGroup({
    quantity: new FormControl<number>(1, Validators.required)
  })

  detailProd: CarProdModel = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category_id: 0,
    status_prod_id: 0,
    category: '',
    state_p: '',
    quantity: 0
  };

  constructor(
    private viewsService: ViewsService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private variablesService: VariablesService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { // we cature the params in url 
      this.viewsService.getAllProductsCatStatus().subscribe(
        data => {
          for (let index = 0; index < data.length; index++) { // filter items with the id item
            if (params['id'] == data[index].id) {
              this.detailProd = {
                id: data[index].id,
                category: data[index].category,
                category_id: data[index].category_id,
                description: data[index].description,
                image: data[index].image,
                name: data[index].name,
                price: data[index].price,
                quantity: 1,
                state_p: data[index].state_p,
                status_prod_id: data[index].status_prod_id
              };
              break;
            }
          }
        }
      );
    });

  }

  pushItems() {

    this.detailProd.quantity = this.formSend.value.quantity!;
    this.variablesService.dataObservableCarItems = this.detailProd;

    //this.variablesService.carItemsAdding(this.detailProd);
  }


}
