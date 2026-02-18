import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {

  navigationItems = [{
    name: "STATS", path: "homepage", icon: "grid_view"
  },
  {
    name: "LOGS", path: "logs", icon: "menu_book"
  }]

  constructor(private router: Router) { }

  createSession() {

  }
}
