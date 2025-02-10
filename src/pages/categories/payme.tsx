import { PaymeHeader } from "./paymeHeader/paymeHeader";
import { PaymeTable } from "./paymeTable/paymeTable";

export const Payme = () => {
  return (
    <>
      <PaymeHeader />
      <div className="mt-10">
        <PaymeTable />
      </div>
    </>
  );
};
