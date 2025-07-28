export interface Users {
    id: number;
    name: string;
    last_name: string;
    email: string;
    gender: string
    date_of_birth: string;
    rol: string;
}
export interface SaveUsers {
    name: string;
    last_name: string;
    email: string;
    gender: string
    date_of_birth: string;
    password: string;
    rol: string;
}

export interface UserLog{
    id: number;
    name: string;
    last_name: string;
    email: string;
    gender: string
    date_of_birth: string;    
    rol: string;
}