export interface ProductModel {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    status_prod_id: number;
    category_id: number;
}
export interface SaveProductModel {
    name: string;
    description: string;
    price: number;
    image: string;
    status_prod_id: number;
    category_id: number;
}