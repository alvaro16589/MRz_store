import { Injectable } from '@angular/core';
import { ProductModel, SaveProductModel } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
      private http:HttpClient 
    ) { 
  
    }
  
    //get all Productss
    getAllProducts(){
      return this.http.get<ProductModel[]>(environment.url_api + environment.product);
    }
    //get someones Productss
    getSomeoneProduct(data:string){ 
      return this.http.get<ProductModel[]>(environment.url_api + environment.product + '/'+ data);//para recibir datos de post deben estar dentro de un array 
    }
    //add new Productss to database
    createProduct(data : SaveProductModel){
      return this.http.post(environment.url_api + environment.product, data);
    }
  
    //update data from Productss
    updateProduct(id:string, changes : Partial<SaveProductModel>){
      return this.http.patch(environment.url_api + environment.product + '/' + id, changes);
    }
  
    //delete fisical Productss
    deleteProduct(id:string){
      return this.http.delete(environment.url_api + environment.product + '/' + id);
    }
}
