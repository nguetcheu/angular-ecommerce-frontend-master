import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { OrderAdmin } from 'src/app/common/order-admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Observable<OrderAdmin[]>;

  constructor(private adminService: AdminService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.orders = this.adminService.getOrdersList();
  }

  deleteOrder(id: number) {
    this.adminService.deleteOrder(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  orderDetails(id: number){
    this.router.navigate(['details', id]);
  }

}
