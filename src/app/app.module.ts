import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormUserModalPageModule } from './form-user-modal/form-user-modal.module';
import { FormArticleModalPageModule } from './form-article-modal/form-article-modal.module';
import { PedidoPDFComponent } from './components/pedido-pdf/pedido-pdf.component';
import { PedidoPDFPageModule } from './pedido-pdf/pedido-pdf.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormUserModalPageModule, FormArticleModalPageModule, PedidoPDFPageModule],
  providers: [
    StatusBar,
    PDFGenerator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
