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