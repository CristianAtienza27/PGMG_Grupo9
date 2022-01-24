import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-pedido-pdf',
  templateUrl: './pedido-pdf.page.html',
  styleUrls: ['./pedido-pdf.page.scss'],
})
export class PedidoPDFPage implements OnInit {

  @Input() order;
  content: string;
  constructor(private modalContrller: ModalController, private pdfGenerator: PDFGenerator) {
  }

  ngOnInit() {
    this.downloadInvoice();
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
    console.log('entra');
  }

}
