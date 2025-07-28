import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './services/category/category.service';
import { ViewsService } from './services/views/views.service';
import { VariablesService } from './services/variables/variables.service';
import { UserService } from './services/user/user.service';
import { OrderService } from './services/order/order.service';
import { StateProdService } from './services/state-prod/state-prod.service';
import { ProductService } from './services/product/product.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    CategoryService,
    ViewsService,
    VariablesService,
    UserService,
    OrderService,
    StateProdService,
    ProductService
  ]
})
export class CoreModule { }
