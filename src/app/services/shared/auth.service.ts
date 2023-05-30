import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string;
  isAuthenticated: boolean = false;

  store: Storage = sessionStorage;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

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

        // email pour la gestion de la connexion
        localStorage.setItem('email', `${res.user.email}`);

        // redirection
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

  //sign in with google
  googleSignIn() {
    return this.fireauth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (res) => {
          this.router.navigate(['/products']);
          localStorage.setItem('token', JSON.stringify(res.user?.uid));
          localStorage.setItem('email', `${res.user.email}`);
          // email pour la gestion du panier
          this.store.setItem('userEmail', JSON.stringify(res.user.email));
        },
        (err) => {
          alert(err.message);
        }
      );
  }
}
