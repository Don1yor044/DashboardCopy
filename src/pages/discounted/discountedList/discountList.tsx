import { Table } from "antd";
import { IDashboards } from "../../../types/types";
import { priceFormatter } from "../../../components";

export const DiscountList = ({ data }: { data: IDashboards[] }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      className: "text-base border-e w-10",
      render: (_: string, __: IDashboards, index: number) => index + 1,
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">User_id</span>
      ),
      dataIndex: "user_id",
      key: "user_id",
      className: "text-base border-e ",
    },
    {
      title: <span className="text-lg font-semibold text-gray-500 ">Ism</span>,
      dataIndex: "full_name",
      key: "full_name",
      className: "text-base border-e ",
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Og'irligi</span>
      ),
      dataIndex: "weight",
      key: "weight",
      className: "text-base border-e w-[100px] text-center",
      render: (w: number) => <div>{w} gr</div>,
    },
    {
      title: (
        <span className="text-lg font-semibold text-red-500">To'lov summa</span>
      ),
      dataIndex: "payment_fee",
      key: "payment_fee",
      className:
        "text-base border-e w-[150px] text-center text-red-500 font-semibold",
      render: (p: number) => <div>{priceFormatter(p)}</div>,
    },
    {
      title: (
        <span className="text-lg font-semibold text-green-500">
          Karta to'lov
        </span>
      ),
      dataIndex: "paid_by_card",
      key: "paid_by_card",
      className:
        "text-base border-e w-[140px] text-center text-green-500 font-semibold",
      render: (p: number) => <div>{priceFormatter(p)}</div>,
    },
    {
      title: (
        <span className="text-lg font-semibold text-green-500">
          Naqt to'lov
        </span>
      ),
      dataIndex: "paid_by_cash",
      key: "paid_by_cash",
      className:
        "text-base border-e w-[140px] text-center text-green-500 font-semibold",
      render: (p: number) => <div>{priceFormatter(p)}</div>,
    },
    {
      title: (
        <span className="text-lg font-semibold text-green-500 ">
          Payme to'lov
        </span>
      ),
      dataIndex: "paid_by_payme",
      key: "paid_by_payme",
      className:
        "text-base border-e w-[140px] text-center text-green-500 font-semibold",
      render: (p: number) => <div>{priceFormatter(p)}</div>,
    },
    {
      title: (
        <span className="text-lg font-semibold text-green-500 ">Chegirma</span>
      ),
      dataIndex: "discounted_fee",
      key: "discounted_fee",
      className:
        "text-base border-e w-[140px] text-center text-green-500 font-semibold",
      render: (p: number) => <div>{priceFormatter(p)}</div>,
    },
    {
      title: <span className="text-lg font-semibold ">Xarid vaqti</span>,
      dataIndex: "purchase_time",
      key: "purchase_time",
      className: "text-base border-e  text-center font-semibold",
    },
    {
      title: <span className="text-lg font-semibold ">Kelgan vaqti</span>,
      dataIndex: "created_at",
      key: "created_at",
      className: "text-base border-e  text-center font-semibold",
      render: (text: string) => {
        if (!text) return "-";
        const date = new Date(text);
        const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
        return formattedDate;
      },
    },
    {
      title: <span className="text-lg font-semibold ">Ketgan vaqti</span>,
      dataIndex: "updated_at",
      key: "updated_at",
      className: "text-base border-e  text-center  font-semibold",
      render: (text: string) => {
        if (!text) return "-";
        const date = new Date(text);
        const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
        return formattedDate;
      },
    },
  ];
  return (
    <div className="mt-2 overflow-auto shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-xl">
      <Table
        dataSource={data.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
        columns={columns}
        pagination={false}
        className="rounded-xl"
        scroll={{ x: 1800 }}
      />
    </div>
  );
};
