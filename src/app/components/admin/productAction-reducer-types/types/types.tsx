export interface Product {
  id: number;
  imagen_url?: string;
  nombre: string;
  precio: number;
  stock?: number;
  marca?: string;
  color?: string;
  descripcion?: string;
}

export interface DecodedToken {
  role: string;
  id: string;
  [key: string]: unknown;
}
