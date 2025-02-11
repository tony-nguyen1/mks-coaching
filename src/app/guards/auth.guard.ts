import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthentificationService } from "../authentification.service";
import { Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  console.log("authGuard");

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(["/auth"]);
    return false;
  }
};
