import { BaseOption } from "./auth";

export interface Setting {
  [key: string]: string | null;
}
export interface SettingSlice extends BaseOption {
  isLoading: boolean;
  data: Setting | null;
  error: null | { [key: string]: string };
}

export interface CreateSetting extends BaseOption {
  settings: Setting;
}
