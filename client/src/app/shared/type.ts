export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface addCustomer {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
}
