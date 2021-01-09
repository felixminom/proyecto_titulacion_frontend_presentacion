import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Politica } from './lista-politicas';
import { environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ListaPoliticasService {

  url = environment.url + 'Visualizacion/Politicas';

  constructor(
    private http: HttpClient
  ) { }

  //Consulta al backend de politicas disponibles para visualizar
  consultarListaPoliticas(): Observable<Politica[]>{
    return this.http.get<Politica[]>(this.url)
  }

}
