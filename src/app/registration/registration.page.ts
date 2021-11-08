import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import {  FormGroup, 
          FormControl, 
          Validators, 
          FormBuilder, 
          EmailValidator} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  formularioRegistration: FormGroup;
  restService : RestService;

  constructor(public fb: FormBuilder, public alertControler: AlertController, restService : RestService) {

    this.formularioRegistration = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellidos': new FormControl("", Validators.required),
      'company_id': new FormControl("",Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmpassword': new FormControl("", Validators.required)
    })

    this.restService = restService;

  }

  ngOnInit() {
  }

  async register(){
    var f = this.formularioRegistration.value;

    if(this.formularioRegistration.invalid){
      const alert = await this.alertControler.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      apellidos: f.apellidos,
      company_id: f.company_id,
      email: f.email,
      password: f.password,
      confirmpassword: f.confirmpassword
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log(usuario);
    this.restService.registrarUsuario
    (usuario.nombre, usuario.apellidos, usuario.company_id, usuario.email, usuario.password, usuario.confirmpassword);
}}
