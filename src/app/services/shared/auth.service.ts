import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string;
  isAuthenticated: boolean = false;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
  ) {}

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        this.isAuthenticated = true;
        localStorage.setItem('token', 'true');
        alert('Connexion succesfull');
        localStorage.setItem('email', `${res.user.email}`);
        this.router.navigate(['/products']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.isAuthenticated = true;
        alert('Inscription succesfull');
        localStorage.setItem('email', `${res.user.email}`);
        this.router.navigate(['/products']);

        this.sendEmailForVerification(res.user);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        this.router.navigate(['/products']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // Check if user is authenticated
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // email verification
  sendEmailForVerification(user: any) {
    user.sendEmailForVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('Something went wrong. Not able to send mail to your email');
      }
    );
  }

  removeGmailDomain(email: string) {
    var domain = '@gmail';
    var atIndex = email.indexOf(domain);

    if (atIndex !== -1) {
      var username = email.substring(0, atIndex);
      return username;
    }

    return email;
  }
}
