import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  standalone: false
})
export class NavBarComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
    return !!localStorage.getItem('token');
    }
    return false;
  }
  
  get userRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
    const role = localStorage.getItem('role');
    return role ? role.toLowerCase() : null;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    window.location.href = '/'; // Or use Angular router
  }
}

