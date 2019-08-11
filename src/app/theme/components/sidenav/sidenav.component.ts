import { APP } from './../../../constants';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})

export class SidenavComponent implements OnInit {
  
  public usuario : Usuario;
  @ViewChild('sidenavPS') sidenavPS: PerfectScrollbarComponent;
  
  public urlImages = APP.UrlImages;
  idUser: any;
  public menuItems:Array<any>;
  public settings: Settings;
  public nombreFoto;
  
  constructor(public appSettings:AppSettings, private appService:AppService ,public menuService:MenuService, private authService: AuthService){
    this.settings = this.appSettings.settings;
  }


  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.idUser = this.usuario.id;
    this.getDataUser(this.idUser);
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  getDataUser(id:any){
    this.appService.get(`usuarios/${id}`).subscribe(
      result=>{
        this.nombreFoto = result['foto'];
      }
    );

  }
  


  CerrarSesion(){
    this.authService.logout();
  }

  public closeSubMenus(){
    let menu = document.querySelector(".sidenav-menu-outer");
    if(menu){
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if(child){
          if(child.children[0].classList.contains('expanded')){
              child.children[0].classList.remove('expanded');
              child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

  public updatePS(e){
    this.sidenavPS.directiveRef.update();
  }

}
