export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface User {
  name: string;
  email: String;
  password: string;
}

export interface LoginSlice {
  items: User[];
  isLoading: boolean;
  error: Error | null;
}

export interface LoginOption extends BaseOption {
  email: string;
  password: string;
}
