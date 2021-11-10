import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  usuarios : any

  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;

  constructor(private restService : RestService, private route: Router) {

  }

  ngOnInit() {
    
    if(this.restService.token != undefined){

      this.restService.obtenerUsuarios()
    .then(usuario => {
      this.usuarios = usuario;
      this.usuarios = this.usuarios.data;
    });

    }
    else{
      this.route.navigate(['/login']);
    }

  }

  activar(user) {
    this.restService.activarUsuario(user.id);
    this.lista.closeSlidingItems();
  }

  desactivar(user) {
    this.restService.desactivarUsuario(user.id);
    this.lista.closeSlidingItems();
  }

  editar(user) {
    console.log('editar', user);
    this.lista.closeSlidingItems();
  }

  eliminar(user) {
    console.log('eliminar', user);
    this.lista.closeSlidingItems();
  }

}
