import { Input } from "antd";
import { Header } from "antd/es/layout/layout";
// import { ChangeEvent } from "react";
import { LuSearch } from "react-icons/lu";
import searchStore from "../../../store/store";
import { observer } from "mobx-react-lite";

export const DashboardHeaderSearch = observer(
  ({
    totalPaymentFee,
    totalPrice,
  }: {
    totalPaymentFee: number;
    totalPrice: number;
  }) => {
    const handleChange = (event: string) => {
      searchStore.setSearchDashboard(event);
    };
    const paymentDifference = totalPaymentFee - totalPrice;

    return (
      <>
        <Header
          style={{ padding: "0px 40px 15px 15px", background: "#FAFBFF " }}
          className="h-28 flex items-end justify-between gap-5 "
        >
          {/* <Button
  type="text"
  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  onClick={() => setCollapsed(!collapsed)}
  style={{
    fontSize: "16px",
    width: 64,
    height: 64,
  }}
/> */}
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
            <div className="border-s ps-5 ">{totalPaymentFee}</div>
          </div>
          <div className="bg-white rounded-2xl p-3 px-4 text-lg font-bold w-full flex gap-10 h-14 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
            <div>To’langan summa </div>
            <div className="border-s ps-5 ">{totalPrice}</div>
          </div>{" "}
          <div className="bg-white rounded-2xl p-3 px-4 text-lg font-bold w-full flex gap-10 h-14 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
            <div>Qolgan summa</div>
            <div className="border-s ps-5 ">{paymentDifference}</div>
          </div>
        </Header>
      </>
    );
  }
);
