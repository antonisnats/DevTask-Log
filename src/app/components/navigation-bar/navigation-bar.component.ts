import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavigationItem {
  name: string;
  path: string;
  icon: string;
}
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {

  @Output() create = new EventEmitter<void>();

  navigationItems: NavigationItem[] = [
    { name: 'STATS', path: 'homepage', icon: 'grid_view' },
    { name: 'LOGS', path: 'logs', icon: 'menu_book' }
  ];


  constructor(private auth: AuthService) { }

  createSession() {
    this.create.emit();
  }

  logout() {
    this.auth.logout();
  }
}
