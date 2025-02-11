import { Component, Renderer2 } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DarkModeService } from "./dark-mode.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "mks-coaching";

  constructor(
    public darkModeService: DarkModeService,
    private myRenderer: Renderer2,
  ) {
    darkModeService.updateGlobalTheme(myRenderer); // this service handles all theme related
  }
}
