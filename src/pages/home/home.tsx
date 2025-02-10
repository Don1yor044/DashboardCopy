import { Dispatch, SetStateAction } from "react";
import { DashboardItems } from "./dashboardItems/dashboardItems";

export const Home = ({
  setTotalPaymentFee,
  setTotalPrice,
  residual,
}: {
  setTotalPaymentFee: Dispatch<SetStateAction<number>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  residual: number;
}) => {
  return (
    <>
      <DashboardItems
        setTotalPaymentFee={setTotalPaymentFee}
        setTotalPrice={setTotalPrice}
        residual={residual}
      />
    </>
  );
};
