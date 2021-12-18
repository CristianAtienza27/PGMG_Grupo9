import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from './services/rest.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public restService: RestService,public route: Router,private menu: MenuController) {}

  logout(){
    this.menu.close();
    this.restService.token = undefined;
    this.route.navigate(['/login']);
  }
}
