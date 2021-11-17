import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormArticleModalPageRoutingModule } from './form-article-modal-routing.module';

import { FormArticleModalPage } from './form-article-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormArticleModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormArticleModalPage]
})
export class FormArticleModalPageModule {}
