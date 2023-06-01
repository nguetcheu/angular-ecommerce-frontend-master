import { Customer } from './customer';

export class OrderAdmin {
  id: number;
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  customer: Customer;
}
