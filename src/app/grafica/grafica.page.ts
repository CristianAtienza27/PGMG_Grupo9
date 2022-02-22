import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Pedido, Order, Orderline } from '../interfaces/interface';
import { ChartComponent } from '../components/chart/chart.component';
import * as moment from 'moment';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {

  @ViewChild('vecesComprado', { static: false }) grafica: ChartComponent;

  misProds: any;
  pedidos: Order[];
  vecesComprado: number[] = [];
  meses: number = 6;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.misProds = this.restService.misProds;

    this.restService.obtenerPedidosEmpresa().subscribe(data => {
      this.pedidos = data['data'];
      console.log(this.pedidos);

      for(let i = 0; i < this.meses; i++){
        this.ObtenerPedidosPorMes(i, 1);
      }

      this.grafica.barChartData = [
        {data: [this.vecesComprado[5], this.vecesComprado[4], this.vecesComprado[3],this.vecesComprado[2], this.vecesComprado[1], this.vecesComprado[0]], label: 'Cantidad'},
      ];
    })
  }

  seleccionarProducto(event){

    this.restService.obtenerPedidosEmpresa().subscribe(data => {
      this.pedidos = data['data'];

      for(let i = 0; i < this.meses; i++){
        this.ObtenerPedidosPorMes(i, event.detail.value);
      }

      this.grafica.barChartData = [
        {data: [this.vecesComprado[5], this.vecesComprado[4], this.vecesComprado[3],this.vecesComprado[2], this.vecesComprado[1], this.vecesComprado[0]], label: 'Cantidad'},
      ];

      console.log(this.vecesComprado);
      
    })
  }

  ObtenerPedidosPorMes(mes: number, idProd: number){

    this.vecesComprado[mes] = 0;

    var primerDia = new Date(new Date().getFullYear(), new Date().getMonth() - mes ,1);
    var ultimoDia = new Date(new Date().getFullYear(), new Date().getMonth() - mes + 1, 0, 23, 59, 59);

    console.log(primerDia + ' ' + ultimoDia);

    this.pedidos.filter(pedido => {
        pedido.order_lines.filter(order_line => {
          if(new Date(order_line.issue_date) > primerDia && new Date(order_line.issue_date) < ultimoDia){
            order_line.articles_line.forEach(article => {
              if(article.article_id == idProd){
                console.log(article);
                this.vecesComprado[mes] += article.num_articles;
              }
            })
          }
        })
    })
  }

}
