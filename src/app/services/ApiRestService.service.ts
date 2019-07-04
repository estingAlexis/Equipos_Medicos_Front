import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
}) 
export class ApiRestService {

 //public url = 'http://impuestos.local/api/v1/';
  public url = 'http://localhost:5000/rest/v1/';
  public publicUrl = 'http://localhost:5000/';
 //public url = 'http://backend.tributo.co/rest/v1/';
 private token = '';
 private httpOptions;
 
 constructor(private http: HttpClient, private auth: AuthService, private router : Router)
 {
  this.getHeaders(); 
 }


 getHeaders(){
  this.token = sessionStorage.getItem('token');
  this.httpOptions = {headers: new HttpHeaders({  'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + this.token})};
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

 //GET
  get(ruta:string)
  {
    if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired(); if(!exp){ this.getHeaders();return this.http.get<any>(this.url.concat(ruta),this.httpOptions);} } 
    this.clearSession();
  }

  //POST
 post(ruta: string, body: any)
 {
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired(); if(!exp){this.getHeaders();return this.http.post<any>(this.url.concat(ruta), body, this.httpOptions); }}
  this.clearSession();
 }

 //DELETE
 delete(ruta: string)
 {
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){ this.getHeaders(); return this.http.delete<any>(this.url.concat(ruta), this.httpOptions);}}
  this.clearSession();
 }

 //PUT
 put(ruta: string, body: any)
 { 
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){this.getHeaders();return this.http.put<any>(this.url.concat(ruta), body, this.httpOptions);}}
  this.clearSession();
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
    return this.http.get(this.url + 'actividades/protocolo/' + id, this.httpOptions);
  }
  // @Get empresas
  public getEmpresas() {
    return this.http.get(this.url + 'empresa/list', this.httpOptions);
  }
  // @Get equipos
  public getEquipos() {
    return this.http.get(this.url + 'equipos/list', this.httpOptions);
  }
  // @Get grupos
  public getGrupos() {
    return this.http.get(this.url + 'grupos/list', this.httpOptions);
  }
  // @Get instrumentos
  public getInstrumentos() {
    return this.http.get(this.url + 'instrumentos/list', this.httpOptions);
  }
  // @Get instrumentos por Protocolos
  public getInstrumentosPorProtocolos(id: string) {
    return this.http.get(this.url + 'ip/1/protocolo/' + id, this.httpOptions);
  }
  // @Get instrumentos -- protocolos
  public getInstrumentosProtocolos() {
    return this.http.get(this.url + 'instrumentos_protocolo/list', this.httpOptions);
  }
  // @Get parametros
  public getParametros() {
    return this.http.get(this.url + 'parametro/list', this.httpOptions);
  }
  // @Get protocolos
  public getProtocolos() {
    return this.http.get(this.url + 'protocolos/list', this.httpOptions);
  }
  // @Get protocolos por Instrumentos
  public getProtocolosPorInstrumento() {
    return this.http.get(this.url + 'ip/1/instrumento/2', this.httpOptions);
  }
  // @Get terceros
  public getTerceros() {
    return this.http.get(this.url + 'terceros/list', this.httpOptions);
  }
  //@Get clientes
  public getClientes(){
    return this.http.get(this.url + 'clientes/list',this.httpOptions);
  }
  // @Get Cotizaciones
  public getCotizaciones() {
    return this.http.get(this.url + 'cotizaciones/list', this.httpOptions);
  }
  //@Get parametro por grupo
  public getParametroGrupo(){
    return this.http.get(this.url + 'parametro/filtro_empresa_grupo/1/2', this.httpOptions)
  }
  //@Get Listar cotizacion por id 
  public getListarCotizacion(id: any){
    return this.http.get(this.url + 'cotizaciones/'.concat(id), this.httpOptions);
  }
  //@Post clientes
/*   post(ruta: string, body: any){
    let repos = this.http.post<any>(this.url.concat(ruta), body, httpOptions); 
  return repos;
  } */
  // @Get Cotizacion Detalle
  public getCotizacionDetalle(){
    return this.http.get(this.url + 'cotizacionesDetalle/list', this.httpOptions);
  }
  // @Get listar
  public getOrden(){
    return this.http.get(this.url + 'ordenes/list', this.httpOptions);
  }

    // @Get Metodos de Pago
    public getMetodosDePago() {
      return this.http.get(this.url + 'cotizaciones/medioDePago/list', this.httpOptions)
    }


  // Modal
  modal: boolean = false;
  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }


}