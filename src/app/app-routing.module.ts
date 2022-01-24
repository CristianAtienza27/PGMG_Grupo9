import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then( m => m.AdministrationPageModule)
  },
  {
    path: 'form-user-modal',
    loadChildren: () => import('./form-user-modal/form-user-modal.module').then( m => m.FormUserModalPageModule)
  },
  {
    path: 'form-article-modal',
    loadChildren: () => import('./form-article-modal/form-article-modal.module').then( m => m.FormArticleModalPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then( m => m.UserPageModule)
  },
  {
    path:'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'empresas-modal',
    loadChildren: () => import('./empresas-modal/empresas-modal.module').then( m => m.EmpresasModalPageModule)
  },
  {
    path: 'empresas-modal',
    loadChildren: () => import('./empresas-modal/empresas-modal.module').then( m => m.EmpresasModalPageModule)
  },
  {
    path: 'pedido-pdf',
    loadChildren: () => import('./pedido-pdf/pedido-pdf.module').then( m => m.PedidoPDFPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
