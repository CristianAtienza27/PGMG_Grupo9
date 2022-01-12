export interface Usuarios{
    usuarios: Usuario[];
}

export interface Usuario{
    id: number;
    firstname: string;
    secondname: string;
    company_id: number;
    actived: number;
    email: string;
    type: string;
    email_confirmed: number;
    deleted: number;
    iscontact: number;
    company: string;
    created_at: Date;
}

export interface Companies {
  success: boolean;
  company: Company[];
  message: string;
}

export interface Company{
    id: number;
    name: string;
}

export interface Product{
    article_id: number;
    company_id: number;
    price: number;
    stock: number;
    family_id: number;
    deleted: number;
}

export interface Article{
    id: number;
    description: string;
    price_min: number;
    price_max: number;
    family_id: number;
    color_name: string;
    size: string;
    weight: string;
    deleted: number;
}

export interface Pedidos {
  success: boolean;
  pedido: Pedido[];
  message: string;
}

export interface Pedido {
  id: number;
  num: string;
  issue_date: string;
  target_company_name: string;
  family_id: number;
  created_at: string;
  delivery_notes: number;
  invoices: number;
}

export interface Productos {
  productos: Producto[];
}

export interface Producto {
  id: number;
  article_id: number;
  company_id: number;
  compamy_name: string;
  compamy_description: string;
  price: string;
  stock: number;
  family_id: number;
  deleted: number;
}


