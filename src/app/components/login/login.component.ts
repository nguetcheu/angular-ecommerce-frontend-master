import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  store: Storage = sessionStorage;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.store.removeItem('userEmail');
  }

  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  adminLogin() {
  
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
