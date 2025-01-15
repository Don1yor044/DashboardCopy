import { Cards } from "./cards";
interface MyComponentProps {
  setTotalPaymentFee: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export const Home: React.FC<MyComponentProps> = ({
  setTotalPaymentFee,
  setTotalPrice,
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
