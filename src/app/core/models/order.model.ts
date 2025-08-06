export interface OrderModel {
    id: number;
    user_id: number;
    status_id: number;
    created_at: string;
    state: string;
}



export interface SaveOrderModel {
    user_id: number;
    status_id: number;

}