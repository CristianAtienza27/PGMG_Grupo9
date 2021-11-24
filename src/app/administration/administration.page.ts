import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList, ModalController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormUserModalPage } from '../form-user-modal/form-user-modal.page';
import { Usuario } from '../interfaces/interface';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  usuarios : Usuario[];
  usuario: any;
  tipoUsuario: any;
  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;

  constructor(
    private restService : RestService,
    public alertController: AlertController, 
    public modalForm: ModalController,
    private loadingCtrl : LoadingController) {
  }

   ngOnInit() {
    //this.getUsuarios();
    this.restService.obtenerUsuarios().subscribe (usuarios => {
      this.usuarios = usuarios;
    })
  }

  async activar(user) {
    this.restService.activarUsuario(user.id);

    const alert = await this.alertController.create({
      header: 'Activación exitosa',
      message: 'El usuario ' + user.firstname + ' ' + user.secondname +  ' ha sido activado',
      buttons: ['Aceptar'],
    });
    await alert.present();

    this.restService.obtenerUsuarios().subscribe (usuarios => {
      this.usuarios = usuarios;
    })

    this.lista.closeSlidingItems();
    // this.actualizar();
  }

  async desactivar(user) {
    this.restService.desactivarUsuario(user.id);

    const alert = await this.alertController.create({
      header: 'Desactivación exitosa',
      message: 'El usuario ' + user.firstname + ' ' + user.secondname +  ' ha sido desactivado',
      buttons: ['Aceptar'],
    });
    await alert.present();

    this.restService.obtenerUsuarios().subscribe (usuarios => {
      this.usuarios = usuarios;
    })

    this.lista.closeSlidingItems();
    // this.actualizar();
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
        
            this.actualizar();
          }
        }
      ]
    });

    await alert.present();

    this.lista.closeSlidingItems();
    //this.actualizar();
  }

  async actualizar(){
    const loading = await this.loadingCtrl.create({});
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.restService.obtenerUsuarios().subscribe (usuarios => {
        this.usuarios = usuarios;
      })
    }, 100 );
  }
  
  // getUsuarios(){
  //   if(this.restService.token != undefined){

  //     this.restService.obtenerUsuarios()
  //   .then(usuario => {
  //     this.usuarios = usuario;
  //     this.usuarios = this.usuarios.data;
  //   });
  // }}

}
