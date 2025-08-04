export interface OrderItemsModel {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;

}

export interface SaveOrderItemsModel {
    order_id: number;
    product_id: number;
    quantity: number;

}