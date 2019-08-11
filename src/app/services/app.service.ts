import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public url = 'http://localhost:5000/rest/v1/';
  /*   public url = 'http://ec2-18-223-126-248.us-east-2.compute.amazonaws.com:5000/rest/v1/';
   */  /* public publicUrl = 'http://ec2-18-223-126-248.us-east-2.compute.amazonaws.com:5000/'; */
  public publicUrl = 'http://localhost:5000/';
  private token = '';
  private httpOptions;
  private httpMultipartOption;
  public fotoUsuario;
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    this.getHeaders();
  }


  getHeaders() {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token }) };
    this.httpMultipartOption = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }
  }

  clearSession() {
    this.auth.logout();
    swal.fire({
      title: 'Error!',
      text: 'Su sesion ha expirado',
      type: 'error'
    })
    this.router.navigate(['/login']);
  }



  //GET
  get(ruta: string) {
    if (this.auth.isAuthenticated()) { if (!this.auth.isTokenExpired()) { this.getHeaders(); return this.http.get<any>(this.url.concat(ruta), this.httpOptions); } }
    this.clearSession();
  }

  //POST
  post(ruta: string, body: any) {
    if (this.auth.isAuthenticated()) { if (!this.auth.isTokenExpired()) { this.getHeaders(); return this.http.post<any>(this.url.concat(ruta), body, this.httpOptions); } }
    this.clearSession();
  }

  //DELETE
  delete(ruta: string) {
    if (this.auth.isAuthenticated()) { if (!this.auth.isTokenExpired()) { this.getHeaders(); return this.http.delete<any>(this.url.concat(ruta), this.httpOptions); } }
    this.clearSession();
  }

  //PUT
  put(ruta: string, body: any) {
    if (this.auth.isAuthenticated()) { if (!this.auth.isTokenExpired()) { this.getHeaders(); return this.http.put<any>(this.url.concat(ruta), body, this.httpOptions); } }
    this.clearSession();
  }


  // getUserPicture(id:any){
  //   this.get(`usuarios/${id}`).subscribe(
  //     result=>{
  //       let nombreFoto = result['foto'];
  //       return nombreFoto;
  //     }
  //   );
  // }


  obtenerFotoPerfil(id) {
    this.get(`usuarios/${id}`).subscribe(
      result => {
        this.fotoUsuario = result['foto'];
      }
    );
    console.log(this.fotoUsuario);
    return this.fotoUsuario;
  }

  subirImagen(Archivo: File, id): Observable<any> {
    if (this.auth.isAuthenticated()) {
      if (!this.auth.isTokenExpired()) {
        this.getHeaders();
        let formData = new FormData();
        formData.append('file', Archivo);
        formData.append('id', id);
        return this.http.post<any>(`${this.url}upload`, formData, this.httpMultipartOption);
      }
    }
    this.clearSession();
  }



  login(usuario: Usuario): Observable<any> {
    const credenciales = btoa('angularapp' + ':' + '12345');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales,
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(this.publicUrl.concat('oauth/token'), params.toString(), { headers: httpHeaders });
  }





}