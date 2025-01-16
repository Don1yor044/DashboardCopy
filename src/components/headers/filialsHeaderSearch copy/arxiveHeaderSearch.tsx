import { Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { LuSearch } from "react-icons/lu";
import searchStore from "../../../store/store";
import { observer } from "mobx-react-lite";

export const ArxiveHeaderSearch = observer(() => {
  const handleChange = (event: string) => {
    searchStore.setSearchDashboard(event);
  };

  const TotalPaymentFee = searchStore.totalPrice;
  const TotalPrice = searchStore.totalPrice;
  const paymentDifference = TotalPaymentFee - TotalPrice;

  return (
    <>
      <Header
        style={{ padding: "0px 40px 15px 15px", background: "#FAFBFF " }}
        className="h-28 flex items-end justify-between gap-5 "
      >
        <div className="bg-white flex gap-2 items-center rounded-full w-full mb-1 h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <LuSearch size={25} color="#FE5222" />
          <Input
            allowClear
            placeholder="Qidiruv..."
            value={searchStore.searchDashboard}
            onChange={(e) => handleChange(e.target.value)}
            className="border-none text-xl"
          />
        </div>
        <div className="bg-white rounded-2xl p-3 px-4 text-lg font-bold w-full flex gap-10 h-14 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <div>Kargo to’lovlar </div>
          <div className="border-s ps-5 ">{TotalPaymentFee}</div>
        </div>
        <div className="bg-white rounded-2xl border-2 text-green-500 border-green-500 p-3 px-4 text-lg font-bold w-full flex gap-10 h-14 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <div>To’langan summa </div>
          <div className="border-s ps-5 ">{TotalPrice}</div>
        </div>{" "}
        <div className="bg-white rounded-2xl border-2 text-red-500 border-red-500 p-3 px-4 text-lg font-bold w-full flex gap-10 h-14 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <div>Qolgan summa</div>
          <div className="border-s ps-5 ">{paymentDifference || 0}</div>
        </div>
      </Header>
    </>
  );
});
