export interface ViewProdModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  status_prod_id: number;
  category_id: number;
  category: string;
  state_p: string;
}
export interface CarProdModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  status_prod_id: number;
  category_id: number;
  category: string;
  state_p: string;
  quantity: number;
}

export interface UserOrdersItemsModel {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  name: number;
  description: string;
  price: number;
  image: string;
  state: string;
}