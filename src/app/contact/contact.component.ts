import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, NavBarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  coachingHours = [
    { day: 'Lundi', hours: '8h00 - 12h00 / 14h00 - 18h00' },
    { day: 'Mardi', hours: '8h00 - 12h00 / 14h00 - 18h00' },
    { day: 'Mercredi', hours: '8h00 - 12h00' },
    { day: 'Jeudi', hours: '8h00 - 12h00 / 14h00 - 18h00' },
    { day: 'Vendredi', hours: '8h00 - 12h00 / 14h00 - 17h00' },
    { day: 'Samedi', hours: '9h00 - 13h00' },
    { day: 'Dimanche', hours: 'Fermé' },
  ];


}
