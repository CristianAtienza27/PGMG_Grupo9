import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import {PedidoComponent } from './pedido/pedido.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PedidosComponent,
    PedidoComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    PedidosComponent,
    PedidoComponent,
  ]
})
export class ComponentsModule { }
