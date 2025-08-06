import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VariablesService } from '../../core/services/variables/variables.service';
import { UserLog } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';

import { CarProdModel } from '../../core/models/views.model';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @ViewChild('dropdownElement', { static: false }) dropdownElement!: ElementRef;
  userLogged!: UserLog;
  countItems = 0;
  constructor(
    private variablesService: VariablesService,
    private renderer: Renderer2,
    private route: Router,
    private userService: UserService

  ) {
    this.userService.LogWatcher().subscribe(
      data => {
        if (data.length > 0) {
          this.userLogged = data[0];

          this.variablesService.setUserLogged({
            id: data[0].id,
            name: data[0].name,
            last_name: data[0].last_name,
            date_of_birth: data[0].date_of_birth,
            email: data[0].email,
            gender: data[0].gender,
            rol: data[0].rol
          });
        }
      })

  }

  ngOnInit(): void {

    this.variablesService.sharedItems.subscribe((car: CarProdModel[]) => {
      this.countItems = 0;
      car.map(c => {
        this.countItems += c.quantity;
      })
    })

    this.userLogged = this.variablesService.getUserlogged();


  }

  toggleDropdown() { //toogle

    const isHidden = this.dropdownElement.nativeElement.classList.contains('hidden');

    if (isHidden) {
      this.renderer.removeClass(this.dropdownElement.nativeElement, 'hidden');
    } else {
      this.renderer.addClass(this.dropdownElement.nativeElement, 'hidden');
    }
  }

  logout() {
    this.variablesService.cleanUserLogged();
    this.userLogged = this.variablesService.getUserlogged();
    this.userService.getLogout().subscribe();
    this.route.navigateByUrl('home/todos');
  }

  goToInvoice() {
    this.route.navigateByUrl('invoice')
  }

}
