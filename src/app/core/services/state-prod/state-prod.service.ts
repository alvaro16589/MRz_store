import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveStateProdModel, StateProdModel } from '../../models/state-prod.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StateProdService {

  constructor(
        private http:HttpClient
  ) { }
  //get all StateProds
    getAllStateProd(){
      return this.http.get<StateProdModel[]>(environment.url_api + environment.stateProd);
    }
    //get somethings StateProds
    getSomeoneStateProd(id : number){
      return this.http.get<StateProdModel>(environment.url_api + environment.stateProd + '/' + id);
    }
    //add new StateProds to database
    createStateProd(data : SaveStateProdModel){
      return this.http.post(environment.url_api + environment.stateProd, data);
    }
  
    //update data from StateProds
    updateStateProd(id:string, changes : Partial<SaveStateProdModel>){
      return this.http.patch(environment.url_api + environment.stateProd + '/' + id, changes);
    }
  
    //delete fisical StateProds
    deleteStateProd(id:string){
      return this.http.delete(environment.url_api + environment.stateProd + '/' + id);
    }
}
