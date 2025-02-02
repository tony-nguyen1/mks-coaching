import { Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';

export const routes: Routes = [
    { path: 'auth', title: 'Authentification', component: AuthentificationComponent },
    { path: 'dashboard', title: 'Tableau de bord', component: DashboardComponent },
    { path: 'signup', title: 'Inscription', component: SignUpComponent },
    { path: '', title: 'Accueil', component: HomeComponent },
    { path: 'dashboard/user/:id', title: "Detail d'un utilisateur", component: UserDetailComponent },
    { path: 'contact', title: 'Contact : Horaires', component: ContactComponent },
    { path: 'service', title: 'Services proposés', component: ServiceComponent },
];