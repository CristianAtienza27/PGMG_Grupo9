import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormGroup, 
          FormControl, 
          Validators, 
          FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  usuario: any;

  constructor(
    public fb: FormBuilder, 
    public alertController: AlertController,
    public restService: RestService,
    public loadingCtrl: LoadingController,
    public route: Router,
    )
    { 
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  
  }

  async login(){

    if(this.formularioLogin.invalid){
      this.showAlert('Datos incompletos','Tienes que llenar todos los campos');
      return;
    }

    this.restService.loginReal(this.formularioLogin.value.email, this.formularioLogin.value.password)
    .then(data => {

      this.usuario = data;
      this.usuario = this.usuario.data;

      this.restService.obtenerUsuario()
      .then(user => {
        this.usuario = user;
        this.usuario = this.usuario.data;

        if(this.usuario.email_confirmed == 1){

          if(this.usuario.actived == 1){

            if(this.usuario.type == 'a'){
              this.route.navigate(['/administration']);
            }
            else{
              this.route.navigate(['/catalogo']);
            }
            
          }else{
            this.showAlert('Error','Espere a ser activado por el administrador');
          }
  
        }else{
          this.showAlert('Error','Confirme el email en su bandeja de entrada');
        }
      })

    })
    
  }

  async showAlert(header, message){

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
  
    await alert.present();
  }

}
