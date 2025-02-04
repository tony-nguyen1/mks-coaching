import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../dark-mode.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importez RouterModule pour utiliser routerLink
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isMenuOpen = false; // Pour gérer l'état du menu mobile
  private readonly prefix = this.constructor.name; // for debugging

  constructor(public darkModeService: DarkModeService) { }

  toggleDarkMode(): void {
    console.log(`${this.prefix}: toggleDarkMode()`);
    this.darkModeService.toggleDarkMode();
  }

  // Fonction pour basculer l'état du menu mobile
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}