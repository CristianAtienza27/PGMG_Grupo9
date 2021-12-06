import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  @Input() pedido: Pedido;

  constructor() { }

  ngOnInit() {}

}
