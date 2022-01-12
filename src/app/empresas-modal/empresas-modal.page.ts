import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Companies, Company } from '../interfaces/interface';

@Component({
  selector: 'app-empresas-modal',
  templateUrl: './empresas-modal.page.html',
  styleUrls: ['./empresas-modal.page.scss'],
})
export class EmpresasModalPage implements OnInit {

  @Input() titulo: string;
  companies: Companies[] = [];

  constructor(public restService: RestService,public modal: ModalController) { }

  ngOnInit() {
    this.cargarCompanias();
    console.log(this.companies);
  }

  cargarCompanias(){
    this.restService.obtenerCompanias().then(data => {
      this.companies = data['data'];
      console.log(this.companies);
    })
  }

  seleccionarCompania(event){
    console.log(event);
  }

  cancelar() {
    this.modal.dismiss();
  }

}
