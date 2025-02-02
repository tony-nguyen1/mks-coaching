import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-service',
  imports: [CommonModule, NavBarComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  public services = [
    {
      title: 'Coaching en salle',
      description: 'Des séances personnalisées en salle de sport avec un suivi adapté à vos objectifs.',
      icon: '🏋️',
    },
    {
      title: 'Coaching à domicile',
      description: 'Un entraînement adapté chez vous, avec ou sans matériel.',
      icon: '🏠',
    },
    {
      title: 'Conseils en nutrition',
      description: 'Un accompagnement sur votre alimentation pour maximiser vos résultats.',
      icon: '🥗',
    },
    {
      title: 'Coaching en ligne',
      description: 'Un suivi à distance avec des programmes et conseils personnalisés.',
      icon: '💻',
    },
    {
      title: 'Préparation physique',
      description: 'Optimisez vos performances sportives grâce à un entraînement structuré.',
      icon: '🏃',
    },
  ];
}
