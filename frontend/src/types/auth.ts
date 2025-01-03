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
  accessToken: "";
  isLoading: boolean;
  error: Error | null;
}

export interface LoginOption extends BaseOption {
  email: string;
  password: string;
}

export interface Payload {
  page?: string | number;
  searchKey?: string | null;
}
