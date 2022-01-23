import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Companies, Company, Products, Product, Pedido } from '../interfaces/interface';

@Component({
  selector: 'app-empresas-modal',
  templateUrl: './empresas-modal.page.html',
  styleUrls: ['./empresas-modal.page.scss'],
})
export class EmpresasModalPage implements OnInit {

  @Input() titulo: string;
  companies: Companies[] = [];
  products: Product[] = [];
  myProducts: Product[] = [];
  prodFiltrados: Product[] = [];
  idMyProd: number[] = [];
  idProd: number[] = [];
  pedido: any;
  target_company_id: number;

  constructor(public restService: RestService,public modal: ModalController) { }

  ngOnInit() {
    this.cargarCompanias();
    this.obtenerMisProd();
  }

  cargarCompanias(){
    this.restService.obtenerCompanias().then(data => { 
      this.companies = data['data'];
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

  realizarPedido(){
    var prodAndCant = '';
    
    this.prodFiltrados.forEach(producto => {
      if(producto.isChecked){
        prodAndCant += producto['article_id'] + ',' + producto.cant + ',';
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
    this.modal.dismiss();
  }

}
