import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Politica } from './lista-politicas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.css']
})

export class ListaPoliticasComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'fecha', 'total_anotaciones'];

  today = new Date();

  dd = String(this.today.getDate()).padStart(2, '0')
  dd2 = String(this.today.setDate(28)).padStart(2, '0')
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = this.today.getFullYear()

  fecha = this.dd +'/' +this.mm +'/' + this.yyyy;

  politica : Politica = {
    id: 1, 
    nombre: "Youtube",
    fecha: this.fecha,
    total_anotaciones: 57
  }

  politica2 : Politica = {
    id: 2, 
    nombre: "Gmail",
    fecha: this.fecha,
    total_anotaciones: 59
  }

  datos : Politica[] = this.fillArray(this.politica, 5).concat(this.fillArray(this.politica2, 4))

  listaPoliticas = new MatTableDataSource(this.datos)

  fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

  constructor(
    private _router : Router
  ) { }

  redirigirPolitica(politica : Politica){
    this._router.navigate(['listaPoliticas/Politica'],  { state: { politica_id: politica.id } })
  }

  aplicarFiltro(valor: string) {
    this.listaPoliticas.filter = valor.trim().toLowerCase()
  }

  ngOnInit() {
    this.listaPoliticas.filterPredicate = function(data, filter : string): boolean {
      return data.nombre.toLowerCase().includes(filter)
    }
  }

}
