import { Dispatch, SetStateAction } from "react";

export interface IDashboards {
  address?: string;
  city?: string;
  comment?: null | string;
  created_at?: string;
  express_line?: string;
  express_num?: string;
  full_name?: string;
  id: number;
  order_id: number;
  paid_at?: null | number;
  paid_by_card?: null | number;
  paid_by_cash?: null | number;
  paid_by_payme?: null | number;
  payment_fee?: number | null;
  discounted_fee?: number | null;
  phone?: string;
  platform_sku?: string;
  purchase_time?: string;
  quantity?: number | null;
  status?: number | null;
  updated_at?: string;
  user_id?: number;
  weight?: number | null;
}
export interface IfiltersData {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  status: number;
  weight: string;
  express_num: string;
  paid_at: number;
  payment_fee: number | null;
  paid_by_card: number | null;
  paid_by_cash: number | null;
  paid_by_payme: number | null;
  discounted_fee: number | null;
  express_line: string;
  comment: string;
  purchase_time: string;
  quantity: number | null;
}
export interface SearchPaymeInputProps {
  isSelected: number[];
  userId: number;
  fetchData: () => void;
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  dataCourse: IDashboards[];
  residual: number;
  searchId: string;
}
