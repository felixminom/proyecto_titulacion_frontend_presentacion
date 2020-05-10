import { Component, Inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Tratamiento, PoliticaPresentacion, Anotacion } from './presentacion-politica'
import { DOCUMENT } from '@angular/common';
import { PresentacionPoliticaService } from './presentacion-politica.service';
import { Router } from '@angular/router';

interface TratamientoNodo {
  expandable: boolean;
  level: number;
  id: number;
  descripcion: string;
  color_primario: string;
  porcentaje: number;
}

@Component({
  selector: 'app-presentacion-politica',
  templateUrl: './presentacion-politica.component.html',
  styleUrls: ['./presentacion-politica.component.css']
})


export class PresentacionPoliticaComponent{

  filtradoTratamiento: boolean = false;
  tratamientoFiltroId: number = 0;

  filtradoAtributo: boolean = false;
  atributoFiltroId: number = 0;

  filtradoTexto: string = ""
  colorTexto: string = "#000";

  presentacion: PoliticaPresentacion;
  politicaTexto: string = "";
  politicaId : number = 0;

  private _transformer = (node: Tratamiento, level: number) => {
    return {
      expandable: !!node.atributos && node.atributos.length > 0,
      descripcion: node.descripcion,
      id: node.id,
      level: level,
      color_primario: node.color_primario,
      porcentaje: node.porcentaje,
      numero_anotaciones: node.numero_anotaciones
    };
  }

  treeControl = new FlatTreeControl<TratamientoNodo>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.atributos);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    @Inject(DOCUMENT) private _documento: Document,
    private _presentacionPoliticaService : PresentacionPoliticaService,
    private _router : Router
  ) { 
    this.politicaId = this._router.getCurrentNavigation().extras.state.politica_id
    this.consultarPolitica(this.politicaId)
  }

  hasChild = (_: number, node: TratamientoNodo) => node.expandable;

  //Manejo de filtros

  filtrarAtributo(atributo: Tratamiento) {
    this.filtradoAtributo = true;
    this.atributoFiltroId = atributo.id;
    this.filtradoTexto = this.filtradoTexto.split("|")[0] + " | " + atributo.descripcion

    this.aplicarFiltroAtributo(atributo.id);
  }

  aplicarFiltroTratamiento(tratamiento_id: number) {
    this.presentacion.politica.parrafos.forEach(
      parrafo => {
        this.nuevoParrafo = parrafo.texto_html

        if (parrafo.titulo != '') {
          this.politicaTexto += '<span style="font-weight: bold; font-size: 18px;">'
            + parrafo.titulo + '</span><br><br>';
        }

        for (let anotacion of parrafo.anotaciones) {
          for (let valor of anotacion.tratamientos) {

            if (valor.tratamiento_id === tratamiento_id) {
              let textoCss: string = '<span class="anotacion" style="color: ' +
                valor.color_primario + '; cursor: pointer">' +
                anotacion.texto_html + this.obtenerToolTip(anotacion) + "</span>";

              this.nuevoParrafo = this.nuevoParrafo.replace(anotacion.texto_html, textoCss)
              break;
            }
          }
        }
        this.politicaTexto += this.nuevoParrafo;
      }
    )

    this.politicaTexto += "<br><br><br><br>";
    let textoHtml = this._documento.getElementById("politica")
    textoHtml.innerHTML = this.politicaTexto
    this.politicaTexto = "";
    this.nuevoParrafo = "";
  }

  aplicarFiltroAtributo(atributo_id: number) {
    this.presentacion.politica.parrafos.forEach(
      parrafo => {
        this.nuevoParrafo = parrafo.texto_html

        if (parrafo.titulo != '') {
          this.politicaTexto += '<span style="font-weight: bold; font-size: 18px;">'
            + parrafo.titulo + '</span><br><br>';
        }

        for (let anotacion of parrafo.anotaciones) {
          for (let valor of anotacion.tratamientos) {

            if (valor.atributo_id === atributo_id) {
              let textoCss: string = '<span class="anotacion" style="color: ' +
                valor.color_primario + '; cursor: pointer">' +
                anotacion.texto_html + this.obtenerToolTip(anotacion) + "</span>";

              this.nuevoParrafo = this.nuevoParrafo.replace(anotacion.texto_html, textoCss)
              break;
            }
          }
        }
        this.politicaTexto += this.nuevoParrafo;
      }
    )

    this.politicaTexto += "<br><br><br><br>";
    let textoHtml = this._documento.getElementById("politica")
    textoHtml.innerHTML = this.politicaTexto
    this.politicaTexto = "";
    this.nuevoParrafo = "";
  }


  manejarFiltroTratamiento(tratamiento: TratamientoNodo) {
    if (this.filtradoTratamiento && this.tratamientoFiltroId == tratamiento.id) {
      this.filtradoTratamiento = false;
      this.filtradoTexto = "";
      this.colorTexto = "#000";
      this.treeControl.collapseAll();
      this.limpiarFiltros();
      this.politicaOriginal();

    } else {
      this.aplicarFiltroTratamiento(tratamiento.id)
      this.filtradoTratamiento = true;
      this.filtradoAtributo = false;
      this.tratamientoFiltroId = tratamiento.id;
      this.filtradoTexto = tratamiento.descripcion;
      this.colorTexto = tratamiento.color_primario;
      this.treeControl.dataNodes.forEach(
        nodo => {
          if (nodo.id == tratamiento.id) {
            this.treeControl.expand(nodo)
          } else {
            this.treeControl.collapse(nodo)
          }
        })
    }
  }

  limpiarFiltros() {
    this.filtradoTratamiento = false;
    this.filtradoAtributo = false;
    this.tratamientoFiltroId = 0;
    this.atributoFiltroId = 0;
    this.filtradoTexto = "";
    this.treeControl.collapseAll();
    this.politicaOriginal();
  }

  estiloTratamiento(tratamiento: TratamientoNodo) {
    let color = tratamiento.color_primario
    let porcentaje = tratamiento.porcentaje
    let estilo = "-webkit-linear-gradient(left, " + color + ", " + color + "7F " + porcentaje + "%, " + "transparent " + porcentaje + "%, " + "transparent 100%)"

    return estilo
  }

  //Manejo de politica
  nuevoParrafo: string;

  politicaOriginal() {
    this.presentacion.politica.parrafos.forEach(
      parrafo => {
        this.nuevoParrafo = parrafo.texto_html;

        if (parrafo.titulo != '') {
          this.politicaTexto += '<span style="font-weight: bold; font-size: 18px;">'
            + parrafo.titulo + '</span><br><br>';
        }

        parrafo.anotaciones.forEach(
          anotacion => {

            let textoCss: string = '<span class="anotacion" style="color: ' +
              anotacion.tratamientos[0].color_primario + '; cursor: pointer">' +
              anotacion.texto_html + this.obtenerToolTip(anotacion) + "</span>"

            this.nuevoParrafo = this.nuevoParrafo.replace(anotacion.texto_html, textoCss)

          }
        )
        this.politicaTexto += this.nuevoParrafo;
      }
    )

    this.politicaTexto += "<br><br><br><br>";
    let textoHtml = this._documento.getElementById("politica")
    textoHtml.innerHTML = this.politicaTexto
    this.politicaTexto = "";
    this.nuevoParrafo = "";
  }

  obtenerToolTip(anotacion: Anotacion): string {
    var encabezado = '<span class="tooltiptext"> Total anotaciones: ' +
      anotacion.tratamientos.length + this.permiteComoTexto(anotacion.permite)
    var pie = '</span>'

    anotacion.tratamientos.forEach(anotacion => {
      encabezado += '<div style="color: ' + anotacion.color_primario + ';">' +
        anotacion.tratamiento_descripcion + ' | ' +
        anotacion.atributo_descripcion + ' | ' +
        anotacion.valor_descripcion + '</div>'

    });

    if (anotacion.comentario) {
      encabezado += '<div style:"font-weigth: bold"> Comentario: </div>' + '<div>' + anotacion.comentario + '</div>'
    }

    return encabezado + pie
  }

  permiteComoTexto(permite : boolean):string{
    if (permite){
      return '<span style="color: green"> PERMITE </span>'
    }else {
      return '<span style="color: red">NO PERMITE </span>'
    }
  }

  consultarPolitica(politica_id: number){
    this._presentacionPoliticaService.consultarPoliticaPresentacion(politica_id).subscribe(
      politica => {
       this.presentacion = politica
       this.dataSource.data = politica.tratamientos
       this.politicaOriginal()
      },
      error => console.log(error)
    )
  }
}