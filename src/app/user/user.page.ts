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

  productos: any;

  constructor(public restService: RestService,public modalForm: ModalController) { }

  ngOnInit() {
    this.cargarProdutos();
  }

  async addArticle() {

    const modal = await this.modalForm.create({
      component: FormArticleModalPage,
      componentProps:{
        titulo: 'Añadir artículo'
      }
    })

    await modal.present();
  }

  cargarProdutos(){
    this.restService.obtenerProductosEmpresa()
    .then(data => {
      this.productos = data;
      this.productos = this.productos.data;
    })
  }
}
