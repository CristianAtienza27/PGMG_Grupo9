import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Pedido } from '../interfaces/interface';

@Component({
  selector: 'app-pedidos1',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})

export class PedidosPage implements OnInit {

  pedidos: Pedido[]= [];

  constructor(public restService: RestService) { }

  ngOnInit() {
    this.restService.obtenerPedidos()
    .subscribe(ped => {
      console.log('pedidos',ped);
      this.pedidos.push(...ped['data']);
    })
  }

}
