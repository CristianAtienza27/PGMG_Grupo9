import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoPDFPage } from './pedido-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoPDFPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPDFPageRoutingModule {}
