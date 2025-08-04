import { Component, effect, OnInit } from '@angular/core';
import { ViewProdModel } from '../../core/models/views.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { VariablesService } from '../../core/services/variables/variables.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxPaginationModule,
    RouterModule,
    CommonModule,
    NgOptimizedImage,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  filterProducts: ViewProdModel[] =[];
   p: number = 1;//variable util para el el paginador
  colorState :any; //Variable that use colors of product's state

  constructor(
    
    private variableService: VariablesService,
    private route: Router,
    
    
  ){
    effect(()=>{
      const data = this.variableService.allViewProduct;// this.variableService.allViewProduct;
      
      this.filterProducts = data;
      
    });
    this.colorState = variableService.colorEstado
  }

  
  ngOnInit(): void {
  
  }

  detailFunction(id : number){
    this.route.navigateByUrl('/detail/'+ id);
  }


}
