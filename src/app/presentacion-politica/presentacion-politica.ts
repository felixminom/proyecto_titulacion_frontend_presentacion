//Esta clase puede ser usada para Tratamientos o Atributos
export class Tratamiento {
    id: number;
    descripcion: string;
    color_primario: string;
    porcentaje?: number;
    numero_anotaciones?: number;
    atributos?: Tratamiento[];
}

export class PoliticaPresentacion{
    tratamientos : Tratamiento[];
    politica : Politica;
}

export class Politica {
    id : number;
    nombre : string;
    fecha : string;
    parrafos : Parrafo [];
}

export class Parrafo {
    id : number;
    titulo : string; 
    texto_html : string; 
    anotaciones : Anotacion[];
}

export class Anotacion {
    id : number;
    texto_html : string; 
    comentario: string;
    permite : boolean;
    tratamientos : TratamientoAnotacion[];
}

export class TratamientoAnotacion {
    tratamiento_id : number;
    tratamiento_descripcion : string;
    atributo_id : number;
    atributo_descripcion : string;
    valor_id: number;
    valor_descripcion: string;
    color_primario: string;
}

