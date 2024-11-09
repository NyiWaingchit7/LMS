import { Lecture } from "./lecture";

interface TopCustomer {
  totalPurchasePrice: 597;
  student: {
    id?: number;
    name: string;
    email: string;
    assetUrl: string;
    phone: string;
  };
}
interface TopLecture {
  purchaseCount: number;
  lecture: Lecture;
}
export interface HomeData {
  totalLesson: number;
  totalLecture: number;
  totalStudent: number;
  totalPurchase: number;
  topCustomer: TopCustomer[];
  topLecture: TopLecture[];
}
export interface HomeSlice {
  isLoading: boolean;
  homeData: HomeData | null;
  error: Error | null;
}
