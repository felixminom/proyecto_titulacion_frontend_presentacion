import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.css']
})
export class ListaPoliticasComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'fecha', 'total_anotaciones'];

  today = new Date();

  dd = String(this.today.getDate()).padStart(2, '0')
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = this.today.getFullYear()

  fecha = this.dd +'/' +this.mm +'/' + this.yyyy;

  politica = {
    id: 1, 
    nombre: "Youtube",
    fecha: this.fecha,
    total_anotaciones: 57
  }

  listaPoliticas = this.fillArray(this.politica, 15)

  fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

  constructor() { }

  redirigirPolitica(politica){
    
  }

  ngOnInit() {
  }

}
