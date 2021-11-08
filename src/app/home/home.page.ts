import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pruebas = [
    {
    id: '1',
    title: 'prueba1',
    img: 'assets/icon/logoAG.png',
    comentarios: ['pruebadec1.1', 'pruebadec2.1']
  }

]

  token: any;
  usuarios: any;

  constructor(public restService: RestService) {
    
  }
  
  ngOninit(){

  }

}
