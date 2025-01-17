import { Dispatch, SetStateAction } from "react";
import { Cards } from "./cards";

export const Home = ({
  setTotalPaymentFee,
  setTotalPrice,
}: {
  setTotalPaymentFee: Dispatch<SetStateAction<number>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <Cards
        setTotalPaymentFee={setTotalPaymentFee}
        setTotalPrice={setTotalPrice}
      />
    </>
  );
};
