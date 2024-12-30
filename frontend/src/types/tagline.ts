import { BaseOption } from "./auth";

export interface TagLine {
  id?: number;
  title: string;
  description: string;
}

export interface TagLineSlice {
  items: TagLine[];
  data: TagLine;
  links: any[];
  isLoading: boolean;
  error: null | { [key: string]: string };
}

export interface CreateTagLine extends BaseOption {
  title: string;
  description: string;
}

export interface UpdateTagLine extends BaseOption {
  id: number;
  title: string;
  description: string;
}

export interface DeleteTagLine extends BaseOption {
  id: number;
}

export const tagLineData = {
  id: undefined,
  title: "",
  description: "",
};
