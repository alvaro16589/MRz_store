import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, RouterModule, } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { StateProdService } from '../../../core/services/state-prod/state-prod.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../core/models/category.model';
import { StateProdModel } from '../../../core/models/state-prod.model';

import { UploadFilesService } from '../../../core/services/uploadFiles/upload-files.service';
import { environment } from '../../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  @ViewChild('imgPreview') myimgeRef!: ElementRef;
  categories: Category[] = [];
  states: StateProdModel[] = [];

  //Form for product
  formProduct = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('0', Validators.required),
    image: new FormControl('', Validators.required),
    status_prod_id: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),

  });

  //Messages for fields 
  msg = {
    required: '*El campo es requerido.',
    error: "Ha ocurrido un error inesperado.",
    correct: 'La operación se ha completado correctamente.'
  }
  title = ''; //title of card form
  data?: File;
  nameFile = '';
  idProduct = 0;
  //Constructor
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private stateProdService: StateProdService,
    private categoryService: CategoryService,
    private uploadFileService: UploadFilesService,
    private toastr: ToastrService

  ) {
    this.activateRoute.params.subscribe((params: Params) => {
      //this.formProduct.get('image')?.disable();


      if (params['id'] == -1) {
        this.title = "Agregar producto";
      } else {
        this.title = "Editar producto";
        this.productService.getSomeoneProduct(params['id']).
          subscribe(Data => {
            this.idProduct = Data[0].id; //capture the id form product
            this.myimgeRef.nativeElement.src = Data[0].image;//rellenamos el IMG textbox invisible con la url de la imagen
            this.formProduct.patchValue({
              name: Data[0].name,
              description: Data[0].description,
              price: Data[0].price.toString(),
              image: Data[0].image,
              status_prod_id: Data[0].status_prod_id.toString(),
              category_id: Data[0].category_id.toString()
            })


          });
      }
    });

    this.stateProdService.getAllStateProd().//fill states select box
      subscribe(data => {
        this.states = data;
      });

    this.categoryService.getAllCategorys().//fill categories select box
      subscribe(data => {
        this.categories = data;
      });

  }

  onFileSelected(event: any) {
    if (event) {
      this.data = <File>event.target.files[0];
      //funcion para mostrar un preview de la imagen cargada
      const reader = new FileReader();
      reader.onload = () => {
        this.myimgeRef.nativeElement.src = reader.result as string;
      };
      reader.readAsDataURL(this.data);
      this.formProduct.patchValue({ image: 'defauld' });
    }
  }

  saveOrUpdateProduct() {
    const f = new FormData;
    if (this.title === "Agregar producto") {
      //actions for adding new product to the list
      if (this.data) {
        try {
          this.nameFile = Date.now() + Math.round(Math.random() * 1E9) + '-imagen.' + this.data.name.substring(this.data.name.length - 3)
          f.append('imagen', this.data, this.nameFile);
          this.uploadFileService.uploadFile(f).subscribe();//subir archivos
          this.productService.createProduct({ //creating a new product and sending it
            name: this.formProduct.value.name ?? '',
            description: this.formProduct.value.description ?? '',
            price: Number(this.formProduct.value.price ?? 0),
            image: environment.url_api + environment.imageFile + this.nameFile,
            status_prod_id: Number(this.formProduct.value.status_prod_id ?? 0),
            category_id: Number(this.formProduct.value.category_id ?? 0)
          }).subscribe();
          this.formProduct.reset();
          this.toastr.success('El registro ha sido efectuado satisfactoriamente', 'Operación satisfactoria');
        } catch (error) {
          this.toastr.error("¡Ha ocurrido un error de conección!", 'Error');
        }
      }
    } else {
      //actions for editing a product on DB
      try {
        if (this.data) { //if data have a values 
          this.nameFile = Date.now() + Math.round(Math.random() * 1E9) + '-imagen.' + this.data.name.substring(this.data.name.length - 3)
          f.append('imagen', this.data, this.nameFile);
          this.uploadFileService.uploadFile(f).subscribe();//subir archivos
          this.productService.updateProduct(this.idProduct.toString(), {
            name: this.formProduct.value.name ?? '',
            description: this.formProduct.value.description ?? '',
            price: Number(this.formProduct.value.price ?? 0),
            image: environment.url_api + environment.imageFile + this.nameFile,
            status_prod_id: Number(this.formProduct.value.status_prod_id ?? 0),
            category_id: Number(this.formProduct.value.category_id ?? 0)
          }).subscribe();
        } else { //else data not have values
          this.productService.updateProduct(this.idProduct.toString(), {
            name: this.formProduct.value.name ?? '',
            description: this.formProduct.value.description ?? '',
            price: Number(this.formProduct.value.price ?? 0),
            status_prod_id: Number(this.formProduct.value.status_prod_id ?? 0),
            category_id: Number(this.formProduct.value.category_id ?? 0)
          }).subscribe();
        }
        
        this.toastr.success('La actualizacion se ha efectuado satisfactoriamente', 'Operación satisfactoria');
      } catch (error) {
        this.toastr.error("¡Ha ocurrido un error de conección!", 'Error');
      }

    }
  }


}
