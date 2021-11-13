import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUserModalPageRoutingModule } from './form-user-modal-routing.module';

import { FormUserModalPage } from './form-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormUserModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormUserModalPage]
})
export class FormUserModalPageModule {}
