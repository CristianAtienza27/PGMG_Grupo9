import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator';
import { RestService } from 'src/app/services/rest.service';
import { Usuario } from 'src/app/interfaces/interface';
@Component({
  selector: 'app-pedido-pdf',
  templateUrl: './pedido-pdf.component.html',
  styleUrls: ['./pedido-pdf.component.scss'],
})
export class PedidoPDFComponent implements OnInit {

  @Input() order;
  content: string;
  contactos: Usuario[] = [];
  constructor(private restService: RestService,private modalContrller: ModalController, private pdfGenerator: PDFGenerator) {
  }
  closeModal() {
    this.modalContrller.dismiss();
  }
  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Order-Invoice.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }
  ngOnInit() {
    console.log('Invoice Page2', this.order);
  }

  obtenerContactos(){
    this.restService.obtenerUsuarios().forEach(data => {
      this.contactos = data['data'];
    })
    console.log(this.contactos);
  }

}
