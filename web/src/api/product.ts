import axios from "../utils/axios";

export interface IData {
  success: true
}

export interface Product {
  id: string
  title: string
  detail: string
  price: number
  total: number
  picture: string
}
export interface ListParams {
  page: number
  limit: number
  keyword?: string
}

export function addProduct(data: Product): Promise<ApiResponse<IData>> {
  return axios.post('/api/product', data);
}

export function buyProduct(data: { id: string }): Promise<ApiResponse<IData>> {
  return axios.post('/api/buy', data);
}

export function getProduct(params: ListParams): Promise<ApiResponse<ListResponse<Product>>> {
  return axios.get('/api/product', { params });
}
