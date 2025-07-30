import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserLog } from '../../core/models/user.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { parseJsonText } from 'typescript';
import { VariablesService } from '../../core/services/variables/variables.service';
import { ToastrService } from 'ngx-toastr';
import { isEmpty } from 'rxjs';
import { OrderService } from '../../core/services/order/order.service';


@Component({
  selector: 'app-user-session',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-session.component.html',
  styleUrl: './user-session.component.css'
})
export class UserSessionComponent {



  logForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  //Messages for fields 

  msg = {
    required: '*El campo es requerido.',
    email: 'El campo debe ser un E-mail.',
    error: 'Ha ocurrido un error inesperado.',
    correct: 'La operación se ha completado correctamente.'
  }
  constructor(
    private userLogin: UserService,
    private serviceVar: VariablesService,
    private router: Router,
    private toastr: ToastrService,
    private orderService: OrderService
  ) {

  }

  loginUser() {
    try {
      this.userLogin.getSomeoneUser({ email: this.logForm.value.email!, password: this.logForm.value.password! }).subscribe({
        next: (data) => {

          

          this.serviceVar.setUserLogged({
            id: data.rows[0].id,
            name: data.rows[0].name,
            last_name: data.rows[0].last_name,
            date_of_birth: data.rows[0].date_of_birth,
            email: data.rows[0].email,
            gender: data.rows[0].gender,
            rol: data.rows[0].rol
          });

          
          this.orderService.createOrder({ user_id: data.rows[0].id, status_id: 2 }).subscribe();
          this.router.navigateByUrl('/', { skipLocationChange: false });

        }

        ,
        error: (err) => {
          this.toastr.error(err.error.message, "Error de inicio de sesión.");//mensaje al usuario
        }
      })
    } catch (Err) {

      this.toastr.error("¡Ha ocurrido un error!", "Error de inicio de sesión.");

    }



  }
}
