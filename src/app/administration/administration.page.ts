import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  usuarios : any
  token : any
  
  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;

  constructor(private restService : RestService) {

  }

  ngOnInit() {
    
    this.restService.obtenerUsuarios(this.restService.token)
    .then(usuario => {
      this.usuarios = usuario;
      this.usuarios = this.usuarios.data;
    });

  }

  favorito(user) {
    console.log('favorite', user);
    this.lista.closeSlidingItems();
   }
   compartir(user) {
    console.log('share', user);
    this.lista.closeSlidingItems();
   }
   borrar(user) {
    console.log('delete', user);
    this.lista.closeSlidingItems();
   }

}
