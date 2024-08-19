export interface myOrderItem {
    quantity: number,
    unitPrice: number,
    productId: string
}
export interface myOrder {
    orderDate: string,
    totalPrice: number,
    userId: string,
    orderItemRequest: myOrderItem[]
}