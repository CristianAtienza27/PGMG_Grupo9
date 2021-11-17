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
    company_id: number;
    price: number;
    stock: number;
    family_id: number;
    deleted: number;
}

