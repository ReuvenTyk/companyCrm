export interface Customer {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface addCustomer {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface User {
  token?: string;
  id: number;
  name: string;
  email: string;
}

export interface RegisterUser {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}
