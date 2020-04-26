import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPoliticasComponent } from './lista-politicas/lista-politicas.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'lista-politicas',
    component: ListaPoliticasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
