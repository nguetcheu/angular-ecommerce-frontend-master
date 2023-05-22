import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private FormBuilder: FormBuilder,
    private luv2shopFormService: Luv2ShopFormService
  ) {}

  ngOnInit(): void {
    const startMonth = new Date().getMonth() + 1;
    console.log(startMonth);

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
    this.luv2shopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved credit card month ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });

    this.luv2shopFormService.getCreditCardYear().subscribe((data) => {
      console.log('Retrieved credit card month ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
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
