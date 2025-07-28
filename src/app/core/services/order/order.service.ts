import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { OrderModel, SaveOrderModel } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( 
    private http:HttpClient
  ) {}

  //get all Orderss
  getAllOrders(){
    return this.http.get<OrderModel[]>(environment.url_api + environment.orders);
  }
  //get somethings Orderss
  getSomeoneOrder(id : number){
    return this.http.get<OrderModel>(environment.url_api + environment.orders + '/' + id);
  }
  //add new Orderss to database
  createOrder(Order : SaveOrderModel){
    return this.http.post(environment.url_api + environment.orders, Order);
  }

  //update data from Orderss
  updateOrder(id:string, changes : Partial<SaveOrderModel>){
    return this.http.patch(environment.url_api + environment.orders + '/' + id, changes);
  }

  //delete fisical Orderss
  deleteOrder(id:string){
    return this.http.delete(environment.url_api + environment.orders + '/' + id);
  }
  
}
