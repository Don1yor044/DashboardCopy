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
  phone?: string;
  platform_sku?: string;
  purchase_time?: string;
  quantity?: number | null;
  status?: number | null;
  updated_at?: string;
  user_id?: number;
  weight?: number | null;
}
