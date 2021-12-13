import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, ToastController, IonSearchbar, LoadingController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Article } from '../interfaces/interface';

@Component({
  selector: 'app-form-article-modal',
  templateUrl: './form-article-modal.page.html',
  styleUrls: ['./form-article-modal.page.scss'],
})
export class FormArticleModalPage implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;

  @Input() titulo: string;
  @Input() productos: [];
  items: any;
  articulos: any[] = [];
  artProv: any[] = [];
  producto: any;
  idProd: string[] = [];
  idArt: string[] = [];
  familias: any[] = [];

  constructor(
    public restService: RestService,
    public modal: ModalController,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.cargarArticulos();
    this.cargarFamilias();
  }
                                                   
  cargarArticulos(){
    this.restService.obtenerArticulos()
    .then(data => {
      this.artProv = data['data'];

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

      for(let i = 0; i < this.artProv.length; i++) {
        for(let j = 0; j < result.length; j++) {
          if(this.artProv[i]['id'] == result[j]){
            this.articulos.push(this.artProv[i])
          }
        }
          // console.log(this.articulos[i]['id']);     
      }
    
  })}

  cargarFamilias(){
    this.restService.obtenerFamilia().then(data => {
      this.familias = data['data'];
      console.log(this.familias);
    })
  }

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

            data.price = this.applyArtMargenBeneficio(article, parseFloat(data.price));

            if(data.price < article.price_min || data.price > article.price_max) {
              this.presentToast(article.price_min, article.price_max);
            }
            else{

              this.producto = {
                article_id: article.id,
                price: data.price,
                family_id: article.family_id,
              }

              this.restService.insertarProducto(this.producto);
              //this.restService.obtenerProductosEmpresa();
              this.modal.dismiss(this.productos);
            }

          }
        }
      ]
    });

    await alert.present();
  }

  buscarArticulo(event){

    const val = event.target.value;

    if(val && val.trim() != '') {
      this.articulos = this.articulos.filter((item: any) => {
        return (item['description'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
     this.cargarArticulos();
    }
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.search.setFocus();
    });
  }

  async presentToast(price_min: any, price_max: any) {
    const toast = await this.toastCtrl.create({
      message: 'El precio debe ser entre ' + price_min + ' y ' + price_max + '€. El precio máximo no incluye el margen de beneficio del producto.',
      duration: 3000
    });
    toast.present();
  }

  async actualizar(mensaje: string){
    const loading = await this.loadingCtrl.create({
      message:mensaje
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.restService.obtenerProductosEmpresa()
    .then(data => {
      this.productos = data['data'];
    })
    }, 500 );
  }

  applyArtMargenBeneficio(article: any, precio: number){
    var family = this.familias.find(f => f['id'] == article.family_id);
    precio = precio + (precio * (parseInt(family['profit_margin']) / 100));
    return precio;
  }

  // applyPrdMargenBeneficio(producto: any, precio: number){
  //   var family = this.familias.find(f => f['id'] == producto.family_id);
  //   producto.price_max = parseFloat(article.price_max) + (parseFloat(article.price_max) * (parseInt(family['profit_margin']) / 100));
  //   return "";
  // }

  cancelar() {
    this.modal.dismiss();
  }
  
}
