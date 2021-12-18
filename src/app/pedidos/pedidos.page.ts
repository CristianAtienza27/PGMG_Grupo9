import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Pedido } from '../interfaces/interface';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pedidos1',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})

export class PedidosPage implements OnInit {

  pedidos: Pedido[] = [];
  pedidosEmpresa : Pedido[] = [];

  constructor(public restService : RestService) { }

  ngOnInit() {

    this.restService.obtenerPedidos()
    .then(ped => {
      console.log('pedidos',ped);

      this.pedidosEmpresa.push(...ped['data']);

      this.pedidosEmpresa.forEach(ped => {
         if(ped.target_company_name == this.restService.company){
          this.pedidos.push(ped);
         }
       })

    });
  }

}
