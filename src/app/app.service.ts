import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from './services/usuario';
import { AuthService } from './services/auth.service';
import { APP } from './services/constants';

const token = sessionStorage.getItem("token");
const httpOptions = { headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
  }) 
};


@Injectable({
  providedIn: 'root'
})
export class AppService {
   //public url = 'http://impuestos.local/api/v1/';
/*    public url = 'http://localhost:5000/rest/v1/'; */
   public publicUrl = 'http://ec2-18-223-126-248.us-east-2.compute.amazonaws.com:5000/';
  //public url = 'http://backend.tributo.co/rest/v1/';

  public url: String = APP.ApiEndpoint;


  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }



  // @Get
  public get(url, callback){
    return this.http.get<any>(this.url+url, httpOptions).subscribe(
      result => { callback(result); },
      error => { callback(error); }
    );
  } 
  
  // @Post
  public post(url, data, callback){
    return this.http.post<any>(this.url+url, data, httpOptions).subscribe(
      result => { callback(result); },
      error => { callback(error); }
    );
  } 

  // @Put
  public put(url, data, callback){
    return this.http.put<any>(this.url+url, data, httpOptions).subscribe(
      result => { callback(result); },
      error => { callback(error); }
    );
  } 

  // @Delete
  public delete(url, callback){
    return this.http.delete<any>(this.url+url, httpOptions).subscribe(
      result => { callback(result); },
      error => { callback(error); }
    );
  } 


  clearSession(){
    this.auth.logout();
    swal.fire({
      title: 'Error!',
      text: 'Su sesion ha expirado',
      type: 'error'
    })
    this.router.navigate(['/login']);
   }  

   
   login(usuario: Usuario): Observable<any> {
    const credenciales = btoa('angularapp' + ':' + '12345');
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + credenciales,
    });
    let params = new URLSearchParams();
    params.set ('grant_type', 'password');
    params.set ('username', usuario.username);
    params.set ('password', usuario.password);
    return this.http.post<any>(this.publicUrl.concat('oauth/token'), params.toString(), {headers: httpHeaders});
  }

  
  // @Get actividades 
  public getActividadesPorProtocolos(id: string) {
    return this.http.get(this.url + 'actividades/protocolo/' + id, httpOptions);
  }
  // @Get empresas
  public getEmpresas() {
    return this.http.get(this.url + 'empresa/list', httpOptions);
  }
  // @Get equipos
  public getEquipos() {
    return this.http.get(this.url + 'equipos/list', httpOptions);
  }
  // @Get grupos
  public getGrupos() {
    return this.http.get(this.url + 'grupos/list', httpOptions);
  }
  // @Get instrumentos
  public getInstrumentos() {
    return this.http.get(this.url + 'instrumentos/list', httpOptions);
  }
  // @Get instrumentos por Protocolos
  public getInstrumentosPorProtocolos(id: string) {
    return this.http.get(this.url + 'ip/1/protocolo/' + id, httpOptions);
  }
  // @Get instrumentos -- protocolos
  public getInstrumentosProtocolos() {
    return this.http.get(this.url + 'instrumentos_protocolo/list', httpOptions);
  }
  // @Get parametros
  public getParametros() {
    return this.http.get(this.url + 'parametro/list', httpOptions);
  }
   // @Get parametro By Id
   public getParametroById(id) {
    return this.http.get(this.url + 'parametro/'+id, httpOptions);
  }
  // @Get protocolos
  public getProtocolos() {
    return this.http.get(this.url + 'protocolos/list', httpOptions);
  }
  // @Get protocolos por Instrumentos
  public getProtocolosPorInstrumento() {
    return this.http.get(this.url + 'ip/1/instrumento/2', httpOptions);
  }
  // @Get terceros
  public getTerceros() {
    return this.http.get(this.url + 'terceros/list', httpOptions);
  }
}
