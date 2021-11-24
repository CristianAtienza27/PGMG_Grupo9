import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Article } from '../interfaces/interface';

@Component({
  selector: 'app-form-article-modal',
  templateUrl: './form-article-modal.page.html',
  styleUrls: ['./form-article-modal.page.scss'],
})
export class FormArticleModalPage implements OnInit {

  @Input() titulo: string;
  @Input() productos: [];
  filtro: string;
  articulos: any[] = [];
  artProv: any[] = [];
  producto: any;
  idProd: string[] = [];
  idArt: string[] = [];

  constructor(
    public restService: RestService,
    public modal: ModalController,
    public alertController: AlertController,
    public toastCtrl: ToastController) {}

  ngOnInit() {

    this.cargarArticulos();
  }

  cargarArticulos(){
    this.restService.obtenerArticulos()
    .then(data => {
      this.artProv = data['data'];

      console.log(this.artProv);

      this.productos.forEach(producto => {
        if(!this.idProd.includes(producto['article_id'])){
          this.idProd.push(producto['article_id'])
        }
      })

      this.artProv.forEach(articulo => {
        if(!this.idArt.includes(articulo['id'])){
          this.idArt.push(articulo['id']);
        }
      })

      var result = this.idArt.filter(id => !this.idProd.includes(id));
      console.log(result);

      for(let i = 0; i < this.artProv.length; i++) {

        for(let j = 0; j < result.length; j++) {
          console.log(this.artProv[i]['id'] + ' ' + result[j]);
          if(this.artProv[i]['id'] == result[j]){
            this.articulos.push(this.artProv[i])
          }
        }
          // console.log(this.articulos[i]['id']);     
      }
    
  })}

  async addArticulo(article: any) {

    const alert = await this.alertController.create({
      header: 'Añadir ',
      subHeader: article.description,
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
          handler: (data) => {

            if(data.price < article.price_min || data.price > article.price_max ) {
              this.presentToast(article.price_min, article.price_max);
            }
            else{

              this.producto = {
                article_id: article.id,
                price: data.price,
                family_id: article.family_id,
              }

              this.restService.insertarProducto(this.producto);
              this.cargarArticulos();
              this.modal.dismiss();
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(price_min: any, price_max: any) {
    const toast = await this.toastCtrl.create({
      message: 'El precio debe ser entre ' + price_min + ' y ' + price_max + '€',
      duration: 2000
    });
    toast.present();
  }

  cancelar() {
    this.modal.dismiss();
  }
}
