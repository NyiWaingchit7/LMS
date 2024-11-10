import { Lecture } from "./lecture";
import { Purchase } from "./purchase";

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
  purchases: Purchase[];
}
export interface HomeSlice {
  isLoading: boolean;
  homeData: HomeData | null;
  error: Error | null;
}
