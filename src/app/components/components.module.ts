import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedido/pedido.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { PedidoPDFComponent } from './pedido-pdf/pedido-pdf.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PedidosComponent,
    PedidoComponent,
    ProductoComponent,
    PedidoPDFComponent,
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
    ProductoComponent,
    PedidoPDFComponent,
  ]
})
export class ComponentsModule { }
