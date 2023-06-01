import { Address } from './address';
import { Customer } from './customer';
import { OrderItem } from './order-item';

export class OrderAdmin {
  id: number;
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  customer: Customer;
  orderItems: OrderItem;
  shippingAddress: Address;
}
