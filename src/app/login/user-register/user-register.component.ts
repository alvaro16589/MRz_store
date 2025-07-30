import { Component, NgModule } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConf: new FormControl('', Validators.required),
    rol: new FormControl('user')
  });

  //Messages for fields 
  msg = {
    required: '*El campo es requerido.',
    email: 'El campo debe ser un E mail.',
    error: "Ha ocurrido un error inesperado.",
    correct: 'La operación se ha completado correctamente.',
    emailRepetido: 'El E-mail ya existe '
  }

  showMessageEmail = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,

  ) {

  }

  mostrar() {
    if (this.userForm.value.password != this.userForm.value.passwordConf) {
      alert("Las contraseñas no coninciden");
    }
  }

  emailFunction(email: string) {
    let c;

    for (let a of email) {
      if (a === '@') {
        c = a;
      }
      if (c === '@' && a === '.') {
        return true;
      }
    }
    return false;
  }

  emailValidator() {//revisar si el email ya existe en el servidor
    if (this.emailFunction(this.userForm.get('email')?.value!)) {//si es un email entonces llama al servidor
      this.userService.emailExist(this.userForm.get('email')?.value ?? '').subscribe(
        data => {

          if (data.result) {
            this.showMessageEmail = true;
          } else {
            this.showMessageEmail = false;

          }
        });
    } else {
      this.showMessageEmail = false;
    }



  }

  saveData() {
    try {
      if (!this.showMessageEmail) {
        if (this.userForm.value.password != this.userForm.value.passwordConf) {//verificar si los capos de contraseña son iguales

          this.toastr.error('Las contraseñas no coinciden', 'Error de contraseñas');

        } else {
          this.userService.createUser({
            name: this.userForm.value.name!,
            last_name: this.userForm.value.lastName!,
            date_of_birth: this.userForm.value.date_of_birth!,
            email: this.userForm.value.email!,
            gender: this.userForm.value.gender!,
            password: this.userForm.value.password!,
            rol: this.userForm.value.rol!
          }).subscribe({
            error: () => {
              this.toastr.error("¡Ha ocurrido un error en el guardado de datos!", 'Error');
            }
          });
          this.userForm.reset();
          this.toastr.success('El registro ha sido efectuado satisfactoriamente', 'Operación satisfactoria');
          this.router.navigateByUrl('/', { skipLocationChange: false });

        }
      } else {
        this.toastr.error("¡El correo electronico ya existe, debe cambiarlo antes de continuar!", 'Error');

      }


    } catch (error) {
      this.toastr.error("¡Ha ocurrido un error de conección!", 'Error');
    }

  }
}
