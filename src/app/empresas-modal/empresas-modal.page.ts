import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Companies, Company, Products, Product, Pedido } from '../interfaces/interface';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Platform } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PedidoPDFPage } from '../pedido-pdf/pedido-pdf.page';
import { Usuario } from '../interfaces/interface';

@Component({
  selector: 'app-empresas-modal',
  templateUrl: './empresas-modal.page.html',
  styleUrls: ['./empresas-modal.page.scss'],
})
export class EmpresasModalPage implements OnInit {

  @Input() titulo: string;
  companies: Company[] = [];
  myCompany: Company[];
  products: Product[] = [];
  myProducts: Product[] = [];
  prodFiltrados: Product[] = [];
  idMyProd: number[] = [];
  idProd: number[] = [];
  pedido: any;
  target_company_id: number;
  docDefinition: any;
  pdfObj: any;
  prodsPedido: Product[] = [];
  contactos: Usuario[] = [];

  constructor(
    public restService: RestService,
    public modalForm: ModalController,
    public emailComposer: EmailComposer,
    public platform: Platform,
    public file:File,
    public fileOpener :FileOpener,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.cargarCompanias();
    this.obtenerMisProd();
  }

  obtenerContactos(){
    this.restService.obtenerUsuarios().forEach(data => {
      this.contactos = data['data'];
    })

    this.contactos.filter
    console.log(this.contactos);
  }

  cargarCompanias(){
    this.restService.obtenerCompanias().then(data => { 
      this.companies = data['data'];
      this.myCompany = this.companies.filter(companies =>companies['id'] == this.restService.company_id)
      console.log(this.myCompany);
      this.companies = this.companies.filter(companies =>companies['id'] != this.restService.company_id);
      console.log(this.companies);
    })
  }

  seleccionarCompania(event){

    this.target_company_id = event.detail.value;

    this.restService.obtenerProductosEmpresa(event.detail.value).then(data => {
      this.products = data['data'];
      console.log(this.products);

      this.products.forEach(producto => {
        if(!this.idProd.includes(producto['article_id'])){
          this.idProd.push(producto['article_id'])
        }
      })

      var result = this.idProd.filter(e => this.idMyProd.includes(e));

      console.log(result);

      this.prodFiltrados = [];

      for(let i = 0; i < this.products.length; i++) {
        for(let j = 0; j < result.length; j++) {
          if(this.products[i]['article_id'] == result[j]){
            this.prodFiltrados.push(this.products[i]);
          }
        }}

      console.log(this.prodFiltrados);
    })

  }

  obtenerMisProd(){
    this.restService.obtenerProductosEmpresa(this.restService.company_id).then(data => {
      this.myProducts = data['data'];
      console.log(this.myProducts);

      this.myProducts.forEach(producto => {
        if(!this.idMyProd.includes(producto['article_id'])){
          this.idMyProd.push(producto['article_id']);
        }
      })

      
    })
  }

  async realizarPedido(){
    var prodAndCant = '';
    this.prodsPedido = []

    this.prodFiltrados.forEach(producto => {
      if(producto.isChecked){
        console.log(producto.article_id)
        this.prodsPedido.push(producto)
      }
    })

    var numPed = Math.round(Math.random() * 1000000);
    var fechaActual = this.obtenerFechaActual();

    this.pedido = {
      num: numPed,
      issue_date: fechaActual,
      origin_company_id: this.restService.company_id,
      target_company_id: this.target_company_id,
    }

    this.restService.insertarPedido(this.pedido,prodAndCant);
    alert('Pedido Realizado')

    const modal = await this.modalForm.create({
        component: PedidoPDFPage,
        componentProps:{
          productos: this.prodsPedido,
          pedido: this.pedido
        }
    })

    await modal.present();
  }

  obtenerFechaActual(){
  
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
      return `${year}-0${month}-${day}`;
    }else{
      return `${year}-${month}-${day}`;
    }

  }

  cancelar() {
    this.modalForm.dismiss();
  }

}
