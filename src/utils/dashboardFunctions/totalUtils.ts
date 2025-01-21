import { Dispatch, SetStateAction } from "react";
import { IDashboards } from "../../types/types";

export const setAggregatedTotals = (
  dashboards: IDashboards[],
  setTotalPaidByCard: Dispatch<SetStateAction<number>>,
  setTotalPaidByCash: Dispatch<SetStateAction<number>>,
  setTotalPaidByPayme: Dispatch<SetStateAction<number>>,
  setTotalPaymentFee: Dispatch<SetStateAction<number>>,
  setTotalPaidByDiscount: Dispatch<SetStateAction<number>>
) => {
  setTotalPaidByCard(
    dashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.paid_by_card || 0),
      0
    )
  );
  setTotalPaidByCash(
    dashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.paid_by_cash || 0),
      0
    )
  );
  setTotalPaidByPayme(
    dashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.paid_by_payme || 0),
      0
    )
  );
  setTotalPaymentFee(
    dashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.payment_fee || 0),
      0
    )
  );
  setTotalPaidByDiscount(
    dashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.discounted_fee || 0),
      0
    )
  );
};

export const resetTotals = (
  setTotalPaidByCard: Dispatch<SetStateAction<number>>,
  setTotalPaidByCash: Dispatch<SetStateAction<number>>,
  setTotalPaidByPayme: Dispatch<SetStateAction<number>>,
  setTotalPaymentFee: Dispatch<SetStateAction<number>>,
  setTotalPrice: Dispatch<SetStateAction<number>>,
  setTotalPaidByDiscount: Dispatch<SetStateAction<number>>
) => {
  setTotalPaidByCard(0);
  setTotalPaidByCash(0);
  setTotalPaidByPayme(0);
  setTotalPaymentFee(0);
  setTotalPrice(0);
  setTotalPaidByDiscount(0);
};
