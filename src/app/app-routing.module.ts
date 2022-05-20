import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {AdminPASSGuard} from "./AdminPASS.guard";


const routes: Routes = [

  {
    path: 'admin',
    /*
    * Active ou active pas la route : dans le tableau on précise le guard ou les guards pour un même path
    * guard = class avec un méthode canActivate qui retourne true ou false et peut le faire de manière asynchrone (observable, promesse) ou direct
    * un guard se termine par .guard.ts
    * */
    canActivate: [AdminPASSGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m =>
      m.AdminModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.module').then(m =>
      m.ClientModule)

  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '404', component: NotfoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
