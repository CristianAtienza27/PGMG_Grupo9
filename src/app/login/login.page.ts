import { Component, OnInit } from '@angular/core';
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

  constructor(
    public fb: FormBuilder, 
    public alertControler: AlertController,
    public restService: RestService,
    public loadingCtrl: LoadingController
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
      const alert = await this.alertControler.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.restService.loginReal(this.formularioLogin.value.email, this.formularioLogin.value.password);
    }, 600 );
    
  }

}
