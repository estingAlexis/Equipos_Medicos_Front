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

  //public url = 'http://impuestos.local/api/v1/';
  public url = 'http://localhost:5000/rest/v1/';
  public publicUrl = 'http://localhost:5000/';
  //public url = 'http://backend.tributo.co/rest/v1/';
  private token = '';
  private httpOptions;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { this.getHeaders(); }

  getHeaders() {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token }) };
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
    if (this.auth.isAuthenticated()) { let exp = this.auth.isTokenExpired(); if (!exp) { this.getHeaders(); return this.http.get<any>(this.url.concat(ruta), this.httpOptions); } }
    this.clearSession();
  }

  //POST
  post(ruta: string, body: any) {
    if (this.auth.isAuthenticated()) { let exp = this.auth.isTokenExpired(); if (!exp) { this.getHeaders(); return this.http.post<any>(this.url.concat(ruta), body, this.httpOptions); } }
    this.clearSession();
  }

  //DELETE
  delete(ruta: string) {
    if (this.auth.isAuthenticated()) { let exp = this.auth.isTokenExpired(); if (!exp) { this.getHeaders(); return this.http.delete<any>(this.url.concat(ruta), this.httpOptions); } }
    this.clearSession();
  }

  //PUT
  put(ruta: string, body: any) {
    if (this.auth.isAuthenticated()) { let exp = this.auth.isTokenExpired(); if (!exp) { this.getHeaders(); return this.http.put<any>(this.url.concat(ruta), body, this.httpOptions); } }
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

  getFormIoData() {
    return {
      "components": [
        {
          "input": false,
          "columns": [
            {
              "components": [
                {
                  "tabindex": "1",
                  "tags": [],
                  "clearOnHide": true,
                  "hidden": false,
                  "input": true,
                  "tableView": true,
                  "inputType": "text",
                  "inputMask": "",
                  "label": "Cliente",
                  "key": "cliente",
                  "placeholder": "Nombre del Cliente",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "defaultValue": "",
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "validate": {
                    "required": true,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                  },
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "type": "textfield"
                },
                {
                  "tabindex": "3",
                  "tags": [],
                  "clearOnHide": true,
                  "hidden": false,
                  "input": true,
                  "tableView": true,
                  "inputType": "email",
                  "label": "Email",
                  "key": "email",
                  "placeholder": "Enter your email address",
                  "prefix": "",
                  "suffix": "",
                  "defaultValue": "",
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "type": "email",
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "kickbox": {
                    "enabled": false
                  }
                }
              ]
            },
            {
              "components": [
                {
                  "tabindex": "2",
                  "tags": [],
                  "clearOnHide": true,
                  "hidden": false,
                  "input": true,
                  "tableView": true,
                  "inputType": "text",
                  "inputMask": "",
                  "label": "Last Name",
                  "key": "lastName",
                  "placeholder": "Enter your last name",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "defaultValue": "",
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "validate": {
                    "required": true,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                  },
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "type": "textfield"
                },
                {
                  "tabindex": "4",
                  "tags": [],
                  "clearOnHide": true,
                  "hidden": false,
                  "input": true,
                  "tableView": true,
                  "inputMask": "(999) 999-9999",
                  "label": "Phone Number",
                  "key": "phoneNumber",
                  "placeholder": "Enter your phone number",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "defaultValue": "",
                  "validate": {
                    "required": true
                  },
                  "type": "phoneNumber",
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  }
                }
              ]
            }
          ],
          "type": "columns",
          "conditional": {
            "show": "",
            "when": null,
            "eq": ""
          }
        },
        {
          "tabindex": "5",
          "tags": [],
          "clearOnHide": true,
          "hidden": false,
          "input": true,
          "tableView": true,
          "label": "Survey",
          "key": "survey",
          "questions": [
            {
              "value": "howWouldYouRateTheFormIoPlatform",
              "label": "How would you rate the Form.io platform?"
            },
            {
              "value": "howWasCustomerSupport",
              "label": "How was Customer Support?"
            },
            {
              "value": "overallExperience",
              "label": "Overall Experience?"
            }
          ],
          "values": [
            {
              "value": "excellent",
              "label": "Excellent"
            },
            {
              "value": "great",
              "label": "Great"
            },
            {
              "value": "good",
              "label": "Good"
            },
            {
              "value": "average",
              "label": "Average"
            },
            {
              "value": "poor",
              "label": "Poor"
            }
          ],
          "defaultValue": "",
          "protected": false,
          "persistent": true,
          "validate": {
            "required": false,
            "custom": "",
            "customPrivate": false
          },
          "type": "survey",
          "conditional": {
            "show": "",
            "when": null,
            "eq": ""
          }
        },
        {
          "tabindex": "6",
          "conditional": {
            "eq": "",
            "when": null,
            "show": ""
          },
          "tags": [],
          "input": true,
          "label": "Submit",
          "tableView": false,
          "key": "submit",
          "size": "sm",
          "leftIcon": "",
          "rightIcon": "",
          "block": false,
          "action": "submit",
          "disableOnInvalid": true,
          "theme": "primary",
          "type": "button"
        }
      ],
      "owner": "554806425867f4ee203ea861",
      "submissionAccess": [
        {
          "type": "create_all",
          "roles": []
        },
        {
          "type": "read_all",
          "roles": []
        },
        {
          "type": "update_all",
          "roles": []
        },
        {
          "type": "delete_all",
          "roles": []
        },
        {
          "type": "create_own",
          "roles": [
            "5692b920d1028f01000407e6"
          ]
        },
        {
          "type": "read_own",
          "roles": []
        },
        {
          "type": "update_own",
          "roles": []
        },
        {
          "type": "delete_own",
          "roles": []
        }
      ],
      "access": [
        {
          "type": "read_all",
          "roles": [
            "5692b920d1028f01000407e4",
            "5692b920d1028f01000407e5",
            "5692b920d1028f01000407e6"
          ]
        }
      ],
      "tags": []
    }
  }

}