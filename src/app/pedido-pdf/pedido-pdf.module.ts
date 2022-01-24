import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPDFPageRoutingModule } from './pedido-pdf-routing.module';

import { PedidoPDFPage } from './pedido-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPDFPageRoutingModule
  ],
  declarations: [PedidoPDFPage]
})
export class PedidoPDFPageModule {}
