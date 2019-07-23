import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenavPS') sidenavPS: PerfectScrollbarComponent;
  public userImage= '../assets/img/ana.jpg';
  public usuario : Usuario;
  public menuItems:Array<any>;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public menuService:MenuService, private authService: AuthService){
      this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.usuario = this.authService.obtenerDatosUser();


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
