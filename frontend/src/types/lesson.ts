import { BaseOption } from "./auth";
import { Lecture, lectureData } from "./lecture";

export interface Lesson {
  id?: number;
  title: string;
  description: string;
  content: string;
  assetImage?: string;
  assetVideo?: string;
  lectureId?: number;
  lecture: Lecture;
}

export interface LessonSlice {
  items: Lesson[];
  data: Lesson;
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLesson extends BaseOption {
  title: string;
  description: string;
  content: string;
  assetImage?: string;
  assetVideo?: string;
  lectureId: number;
}

export interface UpdateLesson extends BaseOption {
  id: number;
  title: string;
  description: string;
  content: string;
  assetImage?: string;
  assetVideo?: string;
  lectureId: number;
}

export interface DeleteLesson extends BaseOption {
  id: number;
}

export const lessonData = {
  id: undefined,
  title: "",
  description: "",
  content: "",
  assetImage: "",
  assetVideo: "",
  lecture: lectureData,
};
