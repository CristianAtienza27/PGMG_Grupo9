import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  EmailValidator
} from '@angular/forms';

@Component({
  selector: 'app-form-user-modal',
  templateUrl: './form-user-modal.page.html',
  styleUrls: ['./form-user-modal.page.scss'],
})
export class FormUserModalPage implements OnInit {

  formularioRegistration: FormGroup;

  @Input() user;
  companies: any;

  constructor(public restService: RestService, public fb: FormBuilder, public modal: ModalController, public alertController: AlertController) {

    this.restService.obtenerCompanias()
    .then(companies => {
      this.companies = companies;
      this.companies = this.companies.data;
      console.log(this.companies);
    })

    this.formularioRegistration = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellidos': new FormControl("", Validators.required),
      'company_id': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      //'password': new FormControl("", Validators.required),
      //'confirmpassword': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {

  }

  async confirmar() {

    if(this.formularioRegistration.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea confirmar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            var f = this.formularioRegistration.value;
        
            var usuario = {
              id: this.user.id,
              nombre: f.nombre,
              apellidos: f.apellidos,
              company_id: f.company_id,
              email: f.email,
              password: f.password
            }

            console.log(usuario)

            localStorage.setItem('usuario', JSON.stringify(usuario));

            this.restService.editarUsuario(
              usuario.id, 
              usuario.nombre, 
              usuario.apellidos, 
              usuario.company_id,
              usuario.email, 
              usuario.password, 
              );

            this.modal.dismiss();
            
          }
        }
      ]
    });

    await alert.present();
  }

  cancelar() {
    this.modal.dismiss();
  }

}
