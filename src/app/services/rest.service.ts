import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios, Usuario, Company } from '../administration/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  token: any;
  id: number;
  actived: number;

  apiUrl = 'http://semillero.allsites.es/public/api';
  constructor(private http: HttpClient) { }

  login(){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: 'raul@raul.com', 
        password: '123456'})     
        .subscribe(data => {
          this.token = data.data.token; 
          console.log(data); 
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
          this.actived = data.data.actived;
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
        console.log(data);
      err => {
        console.log(err)
      }})
    })
  }

  obtenerUsuarios(){
    return new Promise(resolve => {
      this.http.get<Usuarios>(this.apiUrl + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
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
}

