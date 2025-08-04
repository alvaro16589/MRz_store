import { Component, OnChanges, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VariablesService } from '../../core/services/variables/variables.service';
import { CarProdModel } from '../../core/models/views.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItemsService } from '../../core/services/order-items/order-items.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnDestroy, OnChanges {
  items: CarProdModel[] = [];
  result = { //detaill of invoice
    sum: 0,
    costSend: 5,
    result: 0
  };
  constructor(
    private variablesService: VariablesService,
    private orderService: OrderService,
    private toastService: ToastrService,
    private orderItems: OrderItemsService,
    private router: Router
  ) {
    variablesService.sharedItems.subscribe(data => {
      this.items = data;
      //console.log(this.items);
      this.result.sum = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0); //sum of all items
      this.result.result = this.result.sum * (1 + this.result.costSend / 100); //total cost of invoice
    });
  }

  ngOnChanges(): void {

  }

  removeItem(id: number) {
    this.variablesService.clearCarItems = id;
  }

  ngOnDestroy(): void {
  }

  send() {

    this.orderService.getOrderForUserID(this.variablesService.userLogged().id).subscribe(
      {
        next: data => {
          for (let a of this.items) {
            this.orderItems.createOrderItems({
              order_id: data[0].id,
              product_id: a.id,
              quantity: a.quantity
            }).subscribe({
              error: err => {
                
                this.toastService.error("¡Ha ocurrido un error en la operación!", 'Error');
              }
            });
          }

          this.toastService.success('El registro ha sido efectuado satisfactoriamente', 'Operación satisfactoria');
          this.variablesService.clearAllItems();
          this.router.navigateByUrl('home/todos');
        },
        error: err => {
          this.toastService.error("¡Ha ocurrido un error en la operación!", 'Error');

        },
      }
    )
  }
}
