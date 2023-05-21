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
      // Création du group des informations du customer
      customer: this.FormBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      // Création du group des informations de shippingAdress
      shippingAddress: this.FormBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      // Création du group des informations de billingAdress
      billingAddress: this.FormBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      // Création du group des informations de la carte Bancaire
      creditCard: this.FormBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    }
  }

  onSubmit() {
    console.log('Click sur le bouton de validation');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(
      " L'adresse email est " + this.checkoutFormGroup.get('customer').value
    );
  }
}
