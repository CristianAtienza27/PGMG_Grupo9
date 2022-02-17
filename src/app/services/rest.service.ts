import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, Usuarios, Company, Article, Product,Pedido, Order} from '../interfaces/interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  token: any;
  id: number;
  company_id: number;
  company: string;
  usuario: any;
  misProds: any;
  usuarios: Usuario[];
  usuarios$: Subject<Usuario[]>;

  apiUrl = 'http://semillero.allsites.es/public/api';
  constructor(private http: HttpClient) {
    this.usuarios = [];
    this.usuarios$ = new Subject();
   }

  login(){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: 'raul@raul.com', 
        password: '123456'})     
        .subscribe(data => {
          this.token = data.data.token; 
          console.log(this.token); 
          resolve(data);
      });

    });
  }

  loginReal(myemail: string, mypassword: string){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: myemail, 
        password: mypassword})     
        .subscribe(data => {
          this.token = data.data.token;
          this.id = data.data.id; 
          this.company_id = data.data.company_id;
          resolve(data);   
          console.log(data);   
          err=> {
            console.log(err)
          }      
      });

    });
  }

  registrarUsuario(usuario: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register', 
      {
        firstname: usuario.nombre,
        secondname: usuario.apellidos,
        email: usuario.email,
        password: usuario.password,
        c_password: usuario.password,
        company_id: usuario.company_id,})
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    });
  }

  activarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/activate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  desactivarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/deactivate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  editarUsuario(usuario: any) {

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/updated/' + usuario.id,
      {
        user_id: usuario.id,
        firstname: usuario.nombre,
        secondname: usuario.apellidos,
        email: usuario.email,
        password: usuario.password,
        company_id: usuario.company_id,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })

  }

  eliminarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/deleted/' + id,
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
        this.usuarios$.next(this.usuarios);
      err => {
        console.log(err);
      }
      })
    })

  }

  obtenerUsuario(){
    return new Promise(resolve => {
      this.http.get<Usuario>(this.apiUrl + '/user/' + this.id,{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        this.usuario = data;
        this.company = this.usuario['data']['company'];
        console.log(this.usuario);
      err => {
        console.log(err)
      }})
    })
  }

  obtenerUsuarios(): Observable<Usuario[]>{

      this.http.get<Usuarios>(this.apiUrl + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        this.usuarios = data['data'];
        console.log(data['data']);
        this.usuarios$.next(this.usuarios);
      err => {
        console.log(err)
      }
    })

    return this.usuarios$.asObservable();
  }

  obtenerUsuarios$(){
    return new Promise(resolve => {
      this.http.get<Usuarios>(this.apiUrl + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        this.usuarios = data['data'];
        console.log(data['data']);
      err => {
        console.log(err)
      }})
    })
  }

  obtenerCompanias(){

    return new Promise(resolve => {
      this.http.get<Company>(this.apiUrl + '/companies')
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err)
      }})
    })
  }

  insertarProducto(producto: any) {

    return new Promise(resolve => {
      this.http.post<Product>(this.apiUrl + '/products', {
        article_id: producto.article_id,
        company_id: this.company_id,
        price: producto.price,
        family_id: producto.family_id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }})
    })
  }

  obtenerArticulos(){

    return new Promise(resolve => {
      this.http.get<Article>(this.apiUrl + '/articles', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data['data']);
      err=> {
        console.log(err);
      }
    })
    })

  }

  obtenerProductosEmpresa(idProd? : number){

    return new Promise(resolve =>{
      this.http.post(this.apiUrl + '/products/company',
      {
        id: (idProd == null ? this.usuario.data.company_id : idProd)
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
        if(idProd == null){
          this.misProds = data['data'];
          console.log(this.misProds);
        }
      err => {
        console.log(err);
      }
      })
    })
  }

  obtenerPedidos(){
    return new Promise(resolve =>{
      this.http.get<Pedido>(this.apiUrl + '/orders', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err=> {
        console.log(err);
      }})
    })
  }

  obtenerFamilia(){

    return new Promise(resolve =>{
      this.http.get(this.apiUrl + '/families', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err=> {
        console.log(err);
      }})
    })
  }

  eliminarProducto(id: string){

    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/products/' + id , {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err=> {
        console.log(err);
      }
    })
    })
  }

  insertarPedido(pedido: any, prods:string){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/orders', {
        num: pedido['num'],
        issue_date: pedido['issue_date'],
        origin_company_id: pedido['origin_company_id'],
        target_company_id: pedido['target_company_id'],
        products: '1,1,2,2',
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }})
    })
  }
  
  obtenerPedidosEmpresa(): Observable<Order[]>{

    return this.http.post<Order[]>(this.apiUrl + '/orders/company', {
      id: this.company_id
    },
    {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    })
  }

}


