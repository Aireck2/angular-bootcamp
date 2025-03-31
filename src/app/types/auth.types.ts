import { ApiResponse } from './response.types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<{ accessToken: string }>;
