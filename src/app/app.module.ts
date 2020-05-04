import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaPoliticasComponent } from './lista-politicas/lista-politicas.component';
import { HomeComponent } from './home/home.component';
import { PresentacionPoliticaComponent } from './presentacion-politica/presentacion-politica.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaPoliticasComponent,
    HomeComponent,
    PresentacionPoliticaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
