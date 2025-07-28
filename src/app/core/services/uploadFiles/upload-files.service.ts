import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(
      private http:HttpClient
    ) { 
  
    }

  uploadFile(data: FormData){
    return this.http.post(environment.url_api + environment.uploadFile, data);  
  }

  getFileProduc(name:string){
    return this.http.get(environment.url_api + environment.imageFile + name);
  }
  
  deleteFileProduct(name:string){
    return this.http.delete(environment.url_api + environment.imageFile + name)

  }

}
