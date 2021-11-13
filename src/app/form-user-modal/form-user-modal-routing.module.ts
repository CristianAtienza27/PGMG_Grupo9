import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormUserModalPage } from './form-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FormUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormUserModalPageRoutingModule {}
