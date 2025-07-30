import { Component, effect } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { VariablesService } from '../../core/services/variables/variables.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(
  private userService: UserService,    
  private route: Router
    
 ){
  userService.LogWatcher().subscribe(//revisar si existe una sesión activa
      data => {
        if (data.length > 0) {//si existe una sesión activa se rellenan los datos del usuario
          route.navigateByUrl('home/todos');
        }
      })
 }

}

