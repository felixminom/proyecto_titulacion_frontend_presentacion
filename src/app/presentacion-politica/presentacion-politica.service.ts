import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { PoliticaPresentacion } from './presentacion-politica';

@Injectable({
  providedIn: 'root'
})
export class PresentacionPoliticaService {

  url = environment.url + 'Visualizacion/'

  constructor(
    private http: HttpClient
  ) { }

  consultarPoliticaPresentacion(politica_id : number): Observable<PoliticaPresentacion>{
    return this.http.get<PoliticaPresentacion>(this.url + politica_id);
  }
}
