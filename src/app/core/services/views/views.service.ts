import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ViewProdModel } from '../../models/views.model';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  constructor(
    private http:HttpClient
  ) { }

  //get all AllProductsCatStatus
  getAllProductsCatStatus(){
    return this.http.get<ViewProdModel[]>(environment.url_api + environment.productsCategoryStatus);
  }
}
