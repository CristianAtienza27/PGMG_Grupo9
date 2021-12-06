import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Input() pedidos: Pedido[] = [];
  
  constructor() { }

  ngOnInit() {}

}
