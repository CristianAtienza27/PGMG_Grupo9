import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public restService: RestService,public route: Router) {}

  logout(){
    this.restService.token = undefined;
    this.route.navigate(['/login']);
  }
}
