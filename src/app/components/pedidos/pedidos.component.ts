import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/interfaces/interface';
import { IonInfiniteScroll, AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { EmpresasModalPage } from '../../empresas-modal/empresas-modal.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  @Input() pedidos: Pedido[] = [];
  
  constructor(restService: RestService, public alertController: AlertController, public modalController: ModalController) { }

  ngOnInit() {}

  loadData(event) {

    setTimeout(() => {
      if (this.pedidos.length > 2) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      event.target.complete();
     }, 2000);
  }

  async selectEmpresa(){
    const modal = await this.modalController.create({
      component: EmpresasModalPage,
      componentProps:{
        titulo: 'Realizar Pedido',
      }
    })

    // modal.onDidDismiss()
    // .then((data) => {
    //   this.cargarProdutos();
    // })

    await modal.present();
  }
}