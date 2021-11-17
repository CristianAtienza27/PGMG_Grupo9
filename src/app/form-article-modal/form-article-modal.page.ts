import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-form-article-modal',
  templateUrl: './form-article-modal.page.html',
  styleUrls: ['./form-article-modal.page.scss'],
})
export class FormArticleModalPage implements OnInit {

  @Input() titulo: string;
  filtro: string;
  articulos: any;

  constructor(public restService: RestService, public modal: ModalController, public alertController: AlertController) {

   }

  ngOnInit() {
    this.cargarArticulos();
  }

  
  cargarArticulos(){
    this.restService.obtenerArticulos()
    .then(data => {
      this.articulos = data;
      this.articulos = this.articulos.data;
    })
  }

  async addArticulo(article: any) {

    const alert = await this.alertController.create({
      header: 'Añadir ' + article.description +'!',
      inputs: [
        {
          name: 'price',
          type: 'number',
          placeholder: 'Establecer precio'
        }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Añadir',
          handler: () => {
            console.log('Confirm Okay');
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
