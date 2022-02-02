import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Product, Usuario } from '../interfaces/interface';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-pedido-pdf',
  templateUrl: './pedido-pdf.page.html',
  styleUrls: ['./pedido-pdf.page.scss'],
})
export class PedidoPDFPage implements OnInit {

  @Input() productos: Product[] = [];
  @Input() pedido: any[] = [];
  content: string;
  pdfObject: any;
  total: number = 0;
  contactos: Usuario[] = [];

  constructor(private modalContrller: ModalController,
    private file: File,
    private fileOpener: FileOpener,
    private emailComposer: EmailComposer,
    private restService: RestService) {
  }

  ngOnInit() {
    console.log(this.productos)    
    this.productos.forEach(producto =>{
      this.total += producto['price'] * producto['cant']
    })

    this.obtenerContactos();

  }
  closeModal() {
    this.modalContrller.dismiss();
  }

  obtenerContactos(){
    this.restService.obtenerUsuarios().forEach(data => {
      this.contactos = data['data'];
    })

    this.contactos = this.contactos.filter(contacto => {
      contacto['iscontact'] == 0
    })

    console.log(this.contactos)

  }

  createPdf() {
    const pdfBlock = document.getElementById("print-wrapper");
    
    const options = { 
      background: "white", 
      height: pdfBlock.clientWidth, 
      width: pdfBlock.clientHeight 
    };

    domtoimage.toPng(pdfBlock, options).then((fileUrl) => {
      var doc = new JSPDF("p","px","a4");
      doc.addImage(fileUrl, 'PDF', 10, 10, 0,0);
  
      let docRes = doc.output();
      let buffer = new ArrayBuffer(docRes.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
      }

      const directory = this.file.dataDirectory;
      const fileName = "user-data.pdf";

      let options: IWriteOptions = { 
        replace: true 
      };
  
      this.file.checkFile(directory, fileName).then((res)=> {
        this.file.writeFile(directory, fileName,buffer, options)
        .then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => this.enviarMail())
            .catch(e => console.log(e));
        }).catch((error)=> {
          console.log(JSON.stringify(error));
        });
      }).catch((error)=> {
        this.file.writeFile(directory,fileName,buffer).then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => this.enviarMail())
            .catch(e => console.log(e));
        })
        .catch((error)=> {
          console.log(JSON.stringify(error));
        });
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  enviarMail()
  {
    var cont = '';
    this.contactos.forEach(contacto => cont+= contacto['email'] + ',')

    let mail = {
      to: 'cristianatienza26@gmail.com',
      //Prueba correo
      //to: 'raul.reyesmangano@salesianos.edu',
      // Descomentar para mandar a los contactos 
      //to: cont,
      attachments: [
        'file:///data/user/0/io.ionic.starter/files/user-data.pdf'
      ],
      subject: 'Pedido' + this.pedido['num'],
      body: 'Informe del pedido ' + this.pedido['num'],
      isHtml: true
    };
      this.emailComposer.open(mail);
  }
}