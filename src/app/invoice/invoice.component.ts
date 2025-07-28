import { Component, OnChanges, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VariablesService } from '../core/services/variables/variables.service';
import { CarProdModel } from '../core/models/views.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnDestroy, OnChanges {
  items: CarProdModel[] = [];
  result = { //detaill of invoice
    sum : 0,
    costSend: 5,
    result: 0 
  };
  constructor(
    private variablesService: VariablesService,
  ){    
    variablesService.sharedItems.subscribe(data=>{
      this.items = data;
      //console.log(this.items);
      this.result.sum = this.items.reduce((acc, item) => acc + item.price * item.quantity , 0); //sum of all items
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
}
