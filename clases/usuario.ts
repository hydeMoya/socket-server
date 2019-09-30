export class Usuario{

    //atributo obligatorio (todos los usuarios tiene un id identificatorio)
    public id:string;

    //atributo opcional
    public nombre:string;
    
    //una sala puede tener varios alumnos (la informacion solo la escuchara los alumnos pertenecientes a esta sala) 
    public sala: string;

    constructor(id:string){
        this.id=id;
        this.nombre='sin-nombre';
        this.sala = 'sin-sala';
    }
}