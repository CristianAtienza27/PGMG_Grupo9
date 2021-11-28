import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList, ModalController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormArticleModalPage } from '../form-article-modal/form-article-modal.page';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  productos: any[] = [];
  limiteProductos = 20;

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
    this.productos.splice(index, Number(id));
    this.restService.eliminarProducto(id);
  }

  cargarProdutos(){
    this.restService.obtenerProductosEmpresa()
    .then(data => {
      this.productos = data['data'];
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
