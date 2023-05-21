import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  constructor(private FormBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.FormBuilder.group({
      // Création du group des informations du client
      customer: this.FormBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
    });
  }
}
