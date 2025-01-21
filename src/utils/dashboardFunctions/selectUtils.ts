import { Dispatch, SetStateAction } from "react";
import { IDashboards } from "../../types/types";
import { resetTotals } from "./totalUtils";

export const handleSelect = (
  id: number,
  selectedItems: number[],
  setSelectedItems: Dispatch<SetStateAction<number[]>>,
  dataCourse: IDashboards[],
  setTotalPaidByCard: Dispatch<SetStateAction<number>>,
  setTotalPaidByCash: Dispatch<SetStateAction<number>>,
  setTotalPaidByPayme: Dispatch<SetStateAction<number>>,
  setTotalPaymentFee: Dispatch<SetStateAction<number>>,
  setTotalPaidByDiscount: Dispatch<SetStateAction<number>>,
  setTotalPrice: Dispatch<SetStateAction<number>>
) => {
  const newSelectedItems = selectedItems.includes(id)
    ? selectedItems.filter((item) => item !== id)
    : [...selectedItems, id];

  setSelectedItems(newSelectedItems);

  if (newSelectedItems.length > 0) {
    const selectedDashboards = dataCourse.filter((item) =>
      newSelectedItems.includes(item.id)
    );

    const newTotalPaidByCard = selectedDashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.paid_by_card ?? 0),
      0
    );
    const newTotalPaidByCash = selectedDashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.paid_by_cash ?? 0),
      0
    );
    const newTotalPaidByPayme = selectedDashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.paid_by_payme ?? 0),
      0
    );
    const newTotalPaymentFee = selectedDashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.payment_fee ?? 0),
      0
    );

    const newTotalPaidByDiscount = selectedDashboards.reduce(
      (acc: number, dashboard) => acc + (dashboard.discounted_fee ?? 0),
      0
    );
    setTotalPaidByCard(newTotalPaidByCard);
    setTotalPaidByCash(newTotalPaidByCash);
    setTotalPaidByPayme(newTotalPaidByPayme);
    setTotalPaymentFee(newTotalPaymentFee);
    setTotalPaidByDiscount(newTotalPaidByDiscount);
  } else {
    resetTotals(
      setTotalPaidByCard,
      setTotalPaidByCash,
      setTotalPaidByPayme,
      setTotalPaymentFee,
      setTotalPrice,
      setTotalPaidByDiscount
    );
  }
};

export const handlePageChange = (
  page: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
) => {
  setCurrentPage(page);
};
