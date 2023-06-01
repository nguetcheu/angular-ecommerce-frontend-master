import { Customer } from './customer';

export class OrderAdmin {
  id: string;
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  customer: Customer["email"];
}
