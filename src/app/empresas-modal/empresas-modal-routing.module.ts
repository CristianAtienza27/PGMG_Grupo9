import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresasModalPage } from './empresas-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresasModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresasModalPageRoutingModule {}
