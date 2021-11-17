import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormArticleModalPage } from './form-article-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FormArticleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormArticleModalPageRoutingModule {}
