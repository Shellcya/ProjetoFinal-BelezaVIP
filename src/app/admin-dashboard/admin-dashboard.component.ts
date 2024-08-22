import { Component } from '@angular/core';
 
 import { AuthService } from '../services/auth.service';

 
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService) {}


  menuOpen = false;

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
      this.menuOpen = false;
  }

  ngOnInit(): void {}
  logout(): void {
    this.authService.logout();
  }

}
