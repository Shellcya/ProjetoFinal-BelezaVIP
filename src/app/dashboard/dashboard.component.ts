import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

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
