import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';
import { UserLog } from '../../core/models/user.model';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
 

}

