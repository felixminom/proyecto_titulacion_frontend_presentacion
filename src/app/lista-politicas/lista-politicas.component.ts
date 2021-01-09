import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Politica } from './lista-politicas';
import { Router } from '@angular/router';
import { ListaPoliticasService } from './lista-politicas.service';

@Component({
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.css']
})

export class ListaPoliticasComponent {

  displayedColumns = ['id', 'nombre', 'fecha', 'total_anotaciones'];

  listaPoliticas : MatTableDataSource<Politica>;

  constructor(
    private _router : Router,
    private _listaPoliticasService : ListaPoliticasService
  ) { 
    this.consultarPoliticas();
  }

  //Se ejecuta cuando una política es seleccionada
  redirigirPolitica(politica : Politica){
    this._router.navigate(['listaPoliticas/Politica'],  { state: { politica_id: politica.id } })
  }

  //filtrado de anotaciones por el texto de entrada
  aplicarFiltro(valor: string) {
    this.listaPoliticas.filter = valor.trim().toLowerCase()
  }

  //consulta de políticas listas para visualizar
  consultarPoliticas(){
    this._listaPoliticasService.consultarListaPoliticas().subscribe(
      (politicas : Politica[]) => {
        this.listaPoliticas = new MatTableDataSource(politicas)
        this.listaPoliticas.filterPredicate = function(data, filter : string): boolean {
          return data.nombre.toLowerCase().includes(filter) }
      },
      () => alert('No ha sido posible cargar la lista de políticas de privacidad')
    )
  }
}
