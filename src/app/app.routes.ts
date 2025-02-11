import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", title: "Accueil", component: HomeComponent },
  {
    path: "contact",
    title: "Contact : Horaires",
    loadComponent: () =>
      import("./contact/contact.component").then((m) => m.ContactComponent),
  },
  {
    path: "service",
    title: "Services proposés",
    loadComponent: () =>
      import("./service/service.component").then((m) => m.ServiceComponent),
  },
  {
    path: "signup",
    title: "Inscription",
    loadComponent: () =>
      import("./sign-up/sign-up.component").then((m) => m.SignUpComponent),
  },
  {
    path: "auth",
    title: "Authentification",
    loadComponent: () =>
      import("./authentification/authentification.component").then(
        (m) => m.AuthentificationComponent,
      ),
  },
  {
    path: "dashboard/user/:id",
    title: "Detail d'un utilisateur",
    loadComponent: () =>
      import("./user-detail/user-detail.component").then(
        (m) => m.UserDetailComponent,
      ),
  },
  {
    path: "dashboard",
    title: "Tableau de bord",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
    canActivate: [authGuard],
  },
];
