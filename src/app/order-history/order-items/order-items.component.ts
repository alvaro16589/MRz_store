import { Component } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { ViewsService } from '../../core/services/views/views.service';
import { VariablesService } from '../../core/services/variables/variables.service';
import { UserOrdersItemsModel } from '../../core/models/views.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule

  ],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {
  colorOrderState!: any
  orderItems: {
    id: number;
    user_id: number;
    status_id: number;
    created_at: string;
    state: string;
    items: UserOrdersItemsModel[]
  }[] = []
  constructor(
    private orderService: OrderService,
    private viewService: ViewsService,
    private variableService: VariablesService

  ) {
    this.orderService.getOrdersByUserID(this.variableService.userLogged().id).
      subscribe({
        next: (order) => {
          this.viewService.getItemsFromOrdersByUserID(this.variableService.userLogged().id).subscribe(
            data => {
              const products: any[] = [];
              order.forEach(a => {
                products.push({
                  id: a.id,
                  user_id: a.user_id,
                  status_id: a.status_id,
                  created_at: a.created_at,
                  state: a.state,
                  items: data.filter(val => val.order_id === a.id)
                });
              });
              this.orderItems.push(...products.filter(a => a.items.length > 0));
            }
          );
        },
        error: (err) => {

        },
      });
    this.colorOrderState = variableService.colorEstadoOrder
  }




}
