import { Injectable, signal, WritableSignal } from '@angular/core';
import { CarProdModel, ViewProdModel } from '../../models/views.model';
import { ViewsService } from '../views/views.service';
import { UserLog } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  //color de los controles para el estado de los productos
  colorEstado = {
    ELIMINADO: 'bg-red-500',
    ACTIVO: 'bg-green-300',
    AGOTADO: 'bg-yellow-400',
    INACTIVO: 'bg-gray-300'
  }

  carItems = signal<CarProdModel[]>([]);
  private carItemsB: CarProdModel[] = [];
  private carItemsB$: BehaviorSubject<CarProdModel[]> = new BehaviorSubject<CarProdModel[]>([]);
  items: CarProdModel[] = []


  viewProduct = signal<ViewProdModel[]>([{
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category_id: 0,
    status_prod_id: 0,
    category: '',
    state_p: ''
  }]);

  userLogged = signal<UserLog>({
    id: -1,
    name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    gender: "",
    rol: ""
  });

  constructor(
    private viewService: ViewsService
  ) {

    this.viewService.getAllProductsCatStatus().subscribe(
      data => {
        this.viewProduct.set(data);
      }
    )

  }

  cleanViewProduct() {
    this.viewProduct.set([]);
  }

  setViewProduct(data: ViewProdModel[]) {
    this.viewProduct.set(data);
  }

  public get allViewProduct(): ViewProdModel[] {
    return this.viewProduct();
  }


  /////////////////////////////////////////login user

  cleanUserLogged() {
    this.userLogged.set({
      id: -1,
      name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      gender: "",
      rol: ""
    })
  }

  setUserLogged(data: UserLog) {
    this.userLogged.set(data);
  }

  getUserlogged() {
    return this.userLogged();
  }


  /////////////////////////////////////////////////car items

  carItemsAdding(data: CarProdModel) {

    let x = false;
    this.carItems().map(val => {
      if (val.id === data.id) {
        val.quantity += data.quantity;
        x = true;
      };
    });
    if (!x) {
      this.carItems.update((dt) => [...dt, data]);
    };


  }

  cleanCar() {
    this.carItems.set([]);
  }
  ///////////////       OBSERVABLE CAR ITEMS
  get sharedItems() {
    return this.carItemsB$.asObservable();
  }

  set dataObservableCarItems(data: CarProdModel) {

    // Busca el producto en el carrito
    const found = this.carItemsB.find(val => val.id === data.id);

    if (found) {
      found.quantity += data.quantity;
    } else {
      // Usa una copia para evitar referencias compartidas
      this.carItemsB.push({ ...data });
    }

    this.carItemsB$.next([...this.carItemsB]);
    //console.log(this.carItemsB)

  }

  set clearCarItems(index: number) {
    
    this.carItemsB.splice(index, 1);
    this.carItemsB$.next(this.carItemsB);   
    
  }
}




