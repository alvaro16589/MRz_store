import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { SaveUsers, Users } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {

  }

  //get all Userss
  getAllUsers() {
    return this.http.get<Users[]>(environment.url_api + environment.user);
  }
  //get someones Userss
  getSomeoneUser(data: { email: string; password: string; }) {
    return this.http.post<any>(environment.url_api + environment.user + '/u', data, {
      withCredentials: true // Incluye las cookies en la solicitud
    });//para recibir datos de post deben estar dentro de un array 
  }
  LogWatcher() {
    return this.http.post<Users[]>(environment.url_api + environment.user + environment.logWatcher, {},
    {
      withCredentials: true  // Incluye las cookies en la solicitud
    });
  }
  getLogout() {
    return this.http.get(environment.url_api + environment.user + environment.logout,
      {
        withCredentials: true // Incluye las cookies en la solicitud
      }
    );
  }

  //add new Userss to database
  createUser(Users: SaveUsers) {
    return this.http.post(environment.url_api + environment.user, Users);
  }

  //update data from Userss
  updateUser(id: string, changes: Partial<SaveUsers>) {
    return this.http.patch(environment.url_api + environment.user + '/' + id, changes);
  }

  //delete fisical Userss
  deleteUser(id: string) {
    return this.http.delete(environment.url_api + environment.user + '/' + id);
  }
}
