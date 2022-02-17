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

export interface Products{
  success: boolean;
  product: Product[];
  message: string;
}

export interface Product{
    article_id: number;
    company_id: number;
    compamy_name: string;
    compamy_description: string;
    isChecked: boolean;
    cant: number;
    price: number;
    stock: number;
    family_id: number;
    deleted: number;
}

export interface Order {
  id: number;
  origin_company_id: number;
  order_lines: Orderline[];
}

export interface Orderline {
  id: number;
  order_id: number;
  order_line_num: string;
  issue_date: string;
  deleted: number;
  created_at: string;
  updated_at: string;
  articles_line: Articlesline[];
}

export interface Articlesline {
  id: number;
  article_id: number;
  num_articles: number;
  order_lines_id: number;
  deleted: number;
  updated_at: string;
  created_at: string;
  article: Article;
}

export interface Article{
  id: number;
  name: string;
  description: string;
  price_min: string;
  price_max: string;
  color_name: string;
  weight: string;
  size: string;
  family_id: number;
  deleted: number;
  created_at?: any;
  updated_at?: any;
}

export interface Pedidos {
  success: boolean;
  pedido: Pedido[];
  message: string;
}

export interface Pedido {
  id: number;
  num: string;
  issue_date: Date;
  origin_company_id: number;
  target_company_name: string;
  target_company_id: number;
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
  isChecked: boolean;
  price: string;
  stock: number;
  family_id: number;
  deleted: number;
}


