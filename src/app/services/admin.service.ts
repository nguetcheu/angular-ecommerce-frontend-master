import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderAdmin } from '../common/order-admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8585/api/orders';

  constructor(private http: HttpClient) {}

  // Gestion des commandes
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getOrdersList(): Observable<GetResponseOrderAdmin> {
    return this.http.get<GetResponseOrderAdmin>(`${this.baseUrl}`);
  }
}

interface GetResponseOrderAdmin {
  _embedded: {
    orders: OrderAdmin[];
  };
}

