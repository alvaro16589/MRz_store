import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItemsModel, SaveOrderItemsModel } from '../../models/order-items.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

   constructor( 
      private http:HttpClient
    ) {}
  
    //get all Orderss
    getAllOrdersWithItems(){
      return this.http.get<OrderItemsModel[]>(environment.url_api + environment.orderItems);
    }
    //get somethings Orderss
    getSomeoneOrderAndItems(id : number){
      return this.http.get<OrderItemsModel>(environment.url_api + environment.orderItems + '/' + id);
    }
   
    //add new Orderss to database
    createOrderItems(Order : SaveOrderItemsModel){
      return this.http.post(environment.url_api + environment.orderItems, Order);
    }
  
    //update data from Orderss
    updateOrderItems(id:string, changes : Partial<SaveOrderItemsModel>){
      return this.http.patch(environment.url_api + environment.orderItems + '/' + id, changes);
    }
  
    //delete fisical Orderss
    deleteOrderItems(id:string){
      return this.http.delete(environment.url_api + environment.orderItems + '/' + id);
    }
}
