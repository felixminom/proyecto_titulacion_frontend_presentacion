import { Component, OnInit, Inject } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Tratamiento, PoliticaPresentacion, Politica, Parrafo, Anotacion, TratamientoAnotacion } from './presentacion-politica'
import { DOCUMENT } from '@angular/common';
import { equal } from 'assert';

interface TratamientoNodo {
  expandable: boolean;
  level: number;
  id: number;
  descripcion: string;
  color_primario: string;
  porcentaje: number;
}

const parrafo1: Parrafo = {
  id: 1,
  titulo: "Queremos que comprenda los tipos de información que recopilamos mientras usa nuestros servicios",
  texto_html: "Recopilamos información para brindar mejores servicios a todos nuestros usuarios: desde entender cosas básicas como el idioma que usted habla, hasta cosas más complejas como los anuncios que a usted le parecen más útiles, la gente que más le importa en línea o los videos de YouTube que le pueden gustar.<br><br> La información que recopila Google y la forma en que se usa esa información dependen de la manera en la que use nuestros servicios y administre los controles de privacidad.<br><br>Cuando no accede a su Cuenta de Google, almacenamos la información que recopilamos con identificadores únicos que están vinculados con el navegador, la app o el dispositivo que esté usando. Esta acción nos permite realizar tareas como conservar sus preferencias de idiomas en las diferentes sesiones de navegación.<br><br>Cuando accede a su cuenta, también recopilamos información que almacenamos con su Cuenta de Google y que tratamos como información personal.<br><br>",
  anotaciones: [
    {
      id: 1,
      texto_html: "hasta cosas más complejas como los anuncios que a usted le parecen más útiles, la gente que más le importa en línea o los videos de YouTube que le pueden gustar.",
      comentario: "Este es la primera anotacion",
      permite: true,
      tratamientos: [
        {
          tratamiento_id: 1,
          tratamiento_descripcion: "Recoleccion",
          atributo_id: 1,
          atributo_descripcion: "Informacion personal",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#CCCC25"
        },
        {
          tratamiento_id: 2,
          tratamiento_descripcion: "Retención",
          atributo_id: 5,
          atributo_descripcion: "Propósito de retención",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#F06292"

        }

      ]

    },
    {
      id: 1,
      texto_html: "<br><br>Cuando no accede a su Cuenta de Google, almacenamos la información que recopilamos con identificadores únicos que están vinculados con el navegador, la app o el dispositivo que esté usando. Esta acción nos permite realizar tareas como conservar sus preferencias de idiomas en las diferentes sesiones de navegación.<br><br>Cuando accede a su cuenta, también recopilamos información que almacenamos con su Cuenta de Google y que tratamos como información personal.",
      comentario: "Este es la SEGUNNDA anotacion",
      permite: false,
      tratamientos: [
        {
          tratamiento_id: 2,
          tratamiento_descripcion: "Retención",
          atributo_id: 4,
          atributo_descripcion: "Periodo de retención",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#F06292"
        },
        {
          tratamiento_id: 1,
          tratamiento_descripcion: "Recoleccion",
          atributo_id: 2,
          atributo_descripcion: "Modo de recolección",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#CCCC25"
        }
      ]

    },

  ]
}

const parrafo2: Parrafo = {
  id: 2,
  titulo: "¿Qué tipo de información recopilamos?",
  texto_html: "A fin de proporcionarte los Productos de Facebook debemos tratar información sobre ti.<br><br> El tipo de información que recopilamos depende de la forma en la que usas nuestros Productos. <br><br> Puedes obtener información sobre cómo acceder a la información que recopilamos y cómo eliminarla en la configuración de Facebook y la configuración de Instagram. ",
  anotaciones: [
    {
      id: 3,
      texto_html: "Facebook debemos tratar información sobre ti.<br><br> El tipo de información que recopilamos depende de la forma en la que usas nuestros Productos.",
      comentario: "Este es la tercera anotacion",
      permite: false,
      tratamientos: [
        {
          tratamiento_id: 2,
          tratamiento_descripcion: "Retención",
          atributo_id: 4,
          atributo_descripcion: "Periodo de retención",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#F06292"
        },
        {
          tratamiento_id: 2,
          tratamiento_descripcion: "Retención",
          atributo_id: 5,
          atributo_descripcion: "Propósito de retención",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#F06292"
        },

      ]
    },
    {
      id: 4,
      texto_html: "Puedes obtener información sobre cómo acceder a la información que recopilamos y cómo eliminarla en la configuración de Facebook y la configuración de Instagram.",
      comentario: "",
      permite: false,
      tratamientos: [
        {
          tratamiento_id: 3,
          tratamiento_descripcion: "Difusión",
          atributo_id: 6,
          atributo_descripcion: "Propósito",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#96c582"

        },
        {
          tratamiento_id: 3,
          tratamiento_descripcion: "Difusión",
          atributo_id: 7,
          atributo_descripcion: "Periodo",
          valor_id: 1,
          valor_descripcion: "Generico",
          color_primario: "#96c582"
        }
      ]
    }
  ]
}

const listaTratamientos: Tratamiento[] = [
  {
    id: 1,
    descripcion: "Recoleccion",
    color_primario: '#CCCC25',
    porcentaje: 75,
    numero_anotaciones: 75,
    atributos: [
      {
        id: 1,
        descripcion: "Informacion personal",
        color_primario: "#CCCC25"
      },
      {
        id: 2,
        descripcion: "Modo de recoleccion",
        color_primario: "#CCCC25",
      },
      {
        id: 3,
        descripcion: "Eleccion de usuario",
        color_primario: "#CCCC25",
      },
      {
        id: 12,
        descripcion: "Responsable de recoleccion",
        color_primario: "#CCCC25",
      }
    ]
  },
  {
    id: 2,
    descripcion: "Retención",
    color_primario: "#F06292",
    porcentaje: 15,
    numero_anotaciones: 15,
    atributos: [
      {
        id: 4,
        descripcion: "Periodo de retencion",
        color_primario: "#F06292",
      },
      {
        id: 5,
        descripcion: "Proposito de retencion",
        color_primario: "#F06292",
      }
    ]
  },
  {
    id: 3,
    descripcion: "Difusión",
    color_primario: "#96c582",
    porcentaje: 10,
    numero_anotaciones: 10,
    atributos: [
      {
        id: 6,
        descripcion: "Proposito",
        color_primario: "#96c582",
      },
      {
        id: 7,
        descripcion: "Periodo",
        color_primario: "#96c582",
      }
    ]
  }
]

const politca: Politica = {
  id: 1,
  nombre: "Google LLC",
  fecha: "20/04/2020",
  parrafos: [
    parrafo1,
    parrafo2
  ]
}
const politicaPresentacion: PoliticaPresentacion = {
  tratamientos: listaTratamientos,
  politica: politca,
  total_anotaciones: 100
}

@Component({
  selector: 'app-presentacion-politica',
  templateUrl: './presentacion-politica.component.html',
  styleUrls: ['./presentacion-politica.component.css']
})


export class PresentacionPoliticaComponent implements OnInit {

  filtradoTratamiento: boolean = false;
  tratamientoFiltroId: number = 0;

  filtradoAtributo: boolean = false;
  atributoFiltroId: number = 0;

  filtradoTexto: string = ""
  colorTexto: string = "#000";

  //Politica 
  presentacion: PoliticaPresentacion;
  politicaTexto: string = "";


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
    @Inject(DOCUMENT) private _documento: Document
  ) {
    this.presentacion = politicaPresentacion;
    this.dataSource.data = this.presentacion.tratamientos;
  }

  hasChild = (_: number, node: TratamientoNodo) => node.expandable;

  //Manejo de filtros

  filtrarAtributo(atributo: Tratamiento) {
    this.filtradoAtributo = true;
    this.atributoFiltroId = atributo.id;
    this.filtradoTexto = this.filtradoTexto.split("|")[0] + " | " + atributo.descripcion

    this.aplicarFiltroAtributo(atributo.id);
  }

  igual(elemento: number, id: number) {
    return elemento === id
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


  ngOnInit() {
    this.politicaOriginal()
  }
}