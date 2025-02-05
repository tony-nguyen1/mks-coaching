import { effect, Injectable, Renderer2, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly DARK_MODE_KEY = 'darkMode'; // name for the json in cache
  private readonly prefix = this.constructor.name; // for debugging
  public readonly darkModeSignal: WritableSignal<boolean>;

  constructor() {
    const savedMode: string | null = localStorage.getItem(this.DARK_MODE_KEY);
    // this.
    let isDarkModeOn = savedMode ? JSON.parse(savedMode) : false;
    this.darkModeSignal = signal(isDarkModeOn);

    console.log("isDarkModeOn=", isDarkModeOn);
  }

  toggleDarkMode(): void {
    console.log(`${this.prefix}: sending signal`);
    this.darkModeSignal.set(!this.darkModeSignal());
    localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(this.darkModeSignal()));
  }

  updateGlobalTheme(aRenderer: Renderer2) {
    /**
     * Cette fonction est crée ici pour que ce service soit plus facilement réutilisable.
     * C'est ce service qui est responsable du thème et de la gestion du thème.
     * 
     * Malheuresement, en tant que service, il ne peut pas obtenir le renderer.
     * 
     * C'est pourquoi on crée la fonction updateGlobalTheme() qui prend en paramètre le renderer.
     * Tout les autres composants on un accès centralisé et réactif qui permet de gérer le thème du site 
     * dans sa globalité 
     */
    effect(() => {
      if (this.darkModeSignal()) {
        console.log(`${this.prefix}:`, "adding the dark theme");
        aRenderer.removeAttribute(document.body, "data-theme");
        aRenderer.setAttribute(document.body, "data-theme", 'dark');
      } else {
        console.log(`${this.prefix}:`, "adding the bumblebee theme");
        aRenderer.removeAttribute(document.body, "data-theme");
        aRenderer.setAttribute(document.body, "data-theme", 'bumblebee');
      }
    });
  }
}