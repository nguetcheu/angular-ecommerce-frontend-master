import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  userFullName: string;
  isAuthenticated: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
  }

  getAuthentificated(): boolean {
    return (this.isAuthenticated = this.authService.getIsAuthenticated());
  }

  getUserDetails() {
    return (this.userFullName = localStorage.getItem('email'));
  }

  logout() {
    this.authService.logout();
  }
}
