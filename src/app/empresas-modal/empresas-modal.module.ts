import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';

import { EmpresasModalPageRoutingModule } from './empresas-modal-routing.module';

import { EmpresasModalPage } from './empresas-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EmpresasModalPageRoutingModule
  ],
  declarations: [EmpresasModalPage]
})
export class EmpresasModalPageModule {}
