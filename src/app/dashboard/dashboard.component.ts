import { Component, effect, OnInit } from '@angular/core';
import { ViewProdModel } from '../core/models/views.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ViewsService } from '../core/services/views/views.service';
import { VariablesService } from '../core/services/variables/variables.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  filterProducts: ViewProdModel[] =[];
  

  constructor(
    private viewProd : ViewsService,
    private activatedRoute: ActivatedRoute,  
    private variableService: VariablesService,
    private route: Router
    
  ){
    effect(()=>{
      const data = this.variableService.allViewProduct;// this.variableService.allViewProduct;
      
      this.filterProducts = data;
      
    });
    
  }

  
  ngOnInit(): void {
  
  }

  detailFunction(id : number){
    this.route.navigateByUrl('/detail/'+ id);
  }


}
