export class Usuario {


    constructor(username?: string, password?:string){
        this.username = username;
        this.password = password;
    }    


    id: number;
    username: string;
    password: string;
    nombre: string;
    apellido: string;
    email: string;
    entidad: any;
    roles: string[] = [];
  }