import { Component, OnInit, Input } from '@angular/core';
import { Product} from 'src/app/interfaces/interface';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Input() prod: Product;
  cant: number = 1;

  constructor() { }

  ngOnInit() {

  }

  habilitarCant($event){
    this.prod.isChecked = $event.currentTarget.checked;

    if(this.prod.isChecked == true){
      this.cant = 1;
      this.prod.cant = this.cant;
    }

    console.log(this.prod.isChecked);
  }

  sumarCant(){
    this.cant++;
    this.prod.cant = this.cant;
  }

  restCant(){
    if(this.cant > 1){
      this.cant--;
      this.prod.cant = this.cant;
    }
  }

}
