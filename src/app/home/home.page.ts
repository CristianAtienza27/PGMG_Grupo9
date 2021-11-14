import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FormUserModalPage } from '../form-user-modal/form-user-modal.page'; 
import { ModalController } from '@ionic/angular';
import { Usuario } from '../administration/interfaces/interface';


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
  user: Usuario;

  constructor(public restService: RestService, public modalForm : ModalController) {
    
  }
  
  ngOninit(){

  }

  async registrar(){

    const modal = await this.modalForm.create({
      component: FormUserModalPage,
      componentProps:{
        user: this.user,
        titulo: 'Nuevo Usuario'
      }
    })

    await modal.present();

  }

}
