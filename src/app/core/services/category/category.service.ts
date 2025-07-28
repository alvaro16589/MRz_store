import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, SaveCategory } from '../../models/category.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( 
    private http:HttpClient
  ) {}

  //get all Categoryss
  getAllCategorys(){
    return this.http.get<Category[]>(environment.url_api + environment.category);
  }
  //get somethings Categoryss
  getSomeoneCategory(id : number){
    return this.http.get<Category>(environment.url_api + environment.category + '/' + id);
  }
  //add new Categoryss to database
  createCategory(Categorys : SaveCategory){
    return this.http.post(environment.url_api + environment.category, Categorys);
  }

  //update data from Categoryss
  updateCategory(id:string, changes : Partial<SaveCategory>){
    return this.http.patch(environment.url_api + environment.category + '/' + id, changes);
  }

  //delete fisical Categoryss
  deleteCategory(id:string){
    return this.http.delete(environment.url_api + environment.category + '/' + id);
  }

}
