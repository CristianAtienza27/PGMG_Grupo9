import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList, ModalController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormArticleModalPage } from '../form-article-modal/form-article-modal.page';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  productos: any[] = [];
  limiteProductos = 20;
  isDisable = false;

  constructor(
    public restService: RestService,
    public modalForm: ModalController,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.cargarProdutos();
  }

  async addArticle() {

    const modal = await this.modalForm.create({
      component: FormArticleModalPage,
      componentProps:{
        titulo: 'Añadir artículo',
        productos: this.productos
      }
    })

    modal.onDidDismiss()
    .then((data) => {
      this.cargarProdutos();
    })

    await modal.present();
  }

  borrarProducto(index: number, id: string){
    this.productos.splice(index, 1);
    this.restService.eliminarProducto(id);
    this.isDisable = this.productos.length == this.limiteProductos ? true : false;
  }

  cargarProdutos(){
    this.restService.obtenerProductosEmpresa()
    .then(data => {
      this.productos = data['data'];
      this.isDisable = this.productos.length == this.limiteProductos ? true : false;
    })
  }

  async actualizar(mensaje: string){
    const loading = await this.loadingCtrl.create({
      message:mensaje
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.cargarProdutos();
    }, 10 );
  }
}
