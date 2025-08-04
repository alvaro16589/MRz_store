import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login-father/login.component';
import { ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mrz_store';
}
