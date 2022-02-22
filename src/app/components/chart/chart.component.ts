import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'
import { RestService } from 'src/app/services/rest.service';
import { Order } from 'src/app/interfaces/interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})

export class ChartComponent {
  @Input() vecesComprado: number[] = [];
  pedidos: Order[] = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData;
}
