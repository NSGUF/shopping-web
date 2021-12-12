import axios from "../utils/axios";
import { RoleType } from "../const";

export interface Login {
  phone: string
  password: string
}

export type Register = Login & {
  role: RoleType
  password_confirm: string
}

export interface SuccessData {
  success: true
}

export interface LoginData {
  role: RoleType
}

export function register(data: Register): Promise<ApiResponse<SuccessData>> {
  return axios.post('/api/signup', data);
}

export function login(data: Login): Promise<ApiResponse<LoginData>> {
  return axios.post('/api/signin', data);
}

export function logout(): Promise<ApiResponse<SuccessData>> {
  return axios.post('/api/logout');
}
