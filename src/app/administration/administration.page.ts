import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormUserModalPage } from '../form-user-modal/form-user-modal.page';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  usuarios : any

  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;

  constructor(
    private restService : RestService,
    public alertController: AlertController, 
    private route: Router,
    public modalForm: ModalController,
    private loadingCtrl : LoadingController) {
  }

  ngOnInit() {
    if(this.restService.token != undefined){
      this.actualizar();
    }
    else{
      this.route.navigate(['/login']);
    }
    
  }

  async activar(user) {
    this.restService.activarUsuario(user.id);

    const alert = await this.alertController.create({
      header: 'Activación exitosa',
      message: 'El usuario ' + user.firstname + ' ' + user.secondname +  ' ha sido activado',
      buttons: ['Aceptar'],
    });
    await alert.present();

    this.lista.closeSlidingItems();
    this.actualizar();
  }

  async desactivar(user) {
    this.restService.desactivarUsuario(user.id);

    const alert = await this.alertController.create({
      header: 'Desactivación exitosa',
      message: 'El usuario ' + user.firstname + ' ' + user.secondname +  ' ha sido desactivado',
      buttons: ['Aceptar'],
    });
    await alert.present();
  
    this.lista.closeSlidingItems();
    this.actualizar();
  }

  async editar(user) {

    const modal = await this.modalForm.create({
      component: FormUserModalPage,
      componentProps:{
        user: user,
        titulo: 'Editar Usuario'
      }
    })

    await modal.present();

    this.lista.closeSlidingItems();
  }

  async eliminar(user) {

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea eliminar a ' + user.firstname + ' ' + user.secondname + ' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.restService.eliminarUsuario(user.id)
          }
        }
      ]
    });

    await alert.present();

    this.lista.closeSlidingItems();
    this.actualizar();
  }

  async actualizar(){
    const loading = await this.loadingCtrl.create({});
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.getUsuarios()
    }, 50 );
  }

  getUsuarios(){
    if(this.restService.token != undefined){

      this.restService.obtenerUsuarios()
    .then(usuario => {
      this.usuarios = usuario;
      this.usuarios = this.usuarios.data;
    });
  }}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getUsuarios()
    }, 50);
  }
  
}
