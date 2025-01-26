import { BaseOption } from "./auth";
import { Lecture } from "./lecture";
export interface PopularLecture {
  title: string;
  id?: number;
  lectureId: string;
  lecture: Lecture;
}
export interface PopularLectureSlice {
  items: PopularLecture[];
  links: any[];
  isLoading: boolean;
  lectures: Lecture[];
  error: null | { [key: string]: string };
  popularLecture: PopularLecture | null;
}

export interface CreatePopularLecture extends BaseOption {
  title: string;
  lectureId: number;
}

export interface UpdatePopularLecture extends BaseOption {
  id: number;
  title: string;
  lectureId: number;
}

export interface DeletePopularLecture extends BaseOption {
  id: number;
}

export const popuarLectureData = {
  id: undefined,
  title: "",
};
