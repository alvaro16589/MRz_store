import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ViewsService } from '../core/services/views/views.service';
import { CarProdModel, ViewProdModel } from '../core/models/views.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { VariablesService } from '../core/services/variables/variables.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  //zoom cariables
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('mainImage') imageRef!: ElementRef;
  @ViewChild('zoomLens') zoomLensRef!: ElementRef;

  zoomStyle: { [key: string]: string } = {};
  //end zoom
  colorState: any; //Variable that use colors of product's state

  formSend = new FormGroup({
    quantity: new FormControl<number>(1, Validators.required)
  })

  detailProd: CarProdModel = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category_id: 0,
    status_prod_id: 0,
    category: '',
    state_p: '',
    quantity: 0
  };
  //Zoom settings 
  isZoomed = false;
  transformOrigin = 'center center';
  //end zoom settings
  constructor(
    private viewsService: ViewsService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private variablesService: VariablesService
  ) {
    this.colorState = variablesService.colorEstado;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { // we cature the params in url 
      this.viewsService.getAllProductsCatStatus().subscribe(
        data => {
          for (let index = 0; index < data.length; index++) { // filter items with the id item
            if (params['id'] == data[index].id) {
              this.detailProd = {
                id: data[index].id,
                category: data[index].category,
                category_id: data[index].category_id,
                description: data[index].description,
                image: data[index].image,
                name: data[index].name,
                price: data[index].price,
                quantity: 1,
                state_p: data[index].state_p,
                status_prod_id: data[index].status_prod_id
              };
              break;
            }
          }
        }
      );
    });

  }

  pushItems() {

    this.detailProd.quantity = this.formSend.value.quantity!;
    this.variablesService.dataObservableCarItems = this.detailProd;

    //this.variablesService.carItemsAdding(this.detailProd);
  }



  onZoom(event: MouseEvent) {
    const container = this.containerRef.nativeElement as HTMLElement;
    const image = this.imageRef.nativeElement as HTMLImageElement;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const lensSize = 192; // 48 Tailwind -> 192px
    const half = lensSize / 2;

    const backgroundX = (x / container.offsetWidth) * 115;
    const backgroundY = (y / container.offsetHeight) * 115;

    this.zoomStyle = {
      left: `${x - half}px`,
      top: `${y - half}px`,
      backgroundImage: `url('${image.src}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${container.offsetWidth * 1.8}px ${container.offsetHeight * 2}px`,
      backgroundPosition: `${backgroundX}% ${backgroundY}%`,
      backdropFilter: 'blur(2px)',
    };
  }

  hideZoom() {
    this.zoomStyle = {
      display: 'none',
    };
  }
}
