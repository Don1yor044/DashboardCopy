import { Dispatch, SetStateAction } from "react";
import { Cards } from "./cards/cards";

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
      <Cards
        setTotalPaymentFee={setTotalPaymentFee}
        setTotalPrice={setTotalPrice}
        residual={residual}
      />
    </>
  );
};
