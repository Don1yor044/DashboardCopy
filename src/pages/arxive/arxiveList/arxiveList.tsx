import { Table } from "antd";
import { IDashboards } from "../../../types/types";
import { priceFormatter } from "../../../components";

export const ArxiveList = ({ data }: { data: IDashboards[] }) => {
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
      className: "text-base border-e w-12",
    },
    {
      title: <span className="text-lg font-semibold text-gray-500 ">Ism</span>,
      dataIndex: "full_name",
      key: "full_name",
      className:
        "text-base border-e whitespace-nowrap overflow-hidden text-ellipsis",
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
      title: (
        <span className="text-lg font-semibold text-gray-500">
          Telefon raqami
        </span>
      ),
      dataIndex: "phone",
      key: "phone",
      className: "text-base border-e w-[170px] text-center",
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Manzil</span>
      ),
      dataIndex: "address",
      key: "address",
      className: "text-base border-e",
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Shahar</span>
      ),
      dataIndex: "city",
      key: "city",
      className: "text-base border-e ",
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Status</span>
      ),
      dataIndex: "status",
      key: "status",
      className: "text-base border-e",
      render: (status: number) => (
        <div>
          {(() => {
            switch (status) {
              case 1:
                return "Punktda";
              case 2:
                return "Mijoz o'zi olib ketti";
              case 3:
                return "Pochtadan yuborildi";
              case 4:
                return "Postomatga olib ketildi";
              case 5:
                return "Kuryer orqali yetkazildi";
              case 6:
                return "Yandex orqali yetkazildi";
              case 7:
                return "Sotuvchi tomonidan berildi";
              case 8:
                return "Aloqaga chiqmadi";
              case 9:
                return "Gaplashilgan";
              default:
                return "—";
            }
          })()}
        </div>
      ),
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">
          Track Number
        </span>
      ),
      dataIndex: "express_num",
      key: "express_num",
      className: "text-base border-e w-[150px]",
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">
          To'langan Vaqti
        </span>
      ),
      dataIndex: "paid_at",
      key: "paid_at",
      className: "text-base border-e w-[180px]",
    },

    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Avto Kargo</span>
      ),
      dataIndex: "express_line",
      key: "express_line",
      className: "text-base border-e w-[200px]",
    },
    {
      title: <span className="text-lg font-semibold text-gray-500">Izoh</span>,
      dataIndex: "comment",
      key: "comment",
      className:
        "text-base border-e whitespace-nowrap overflow-hidden text-ellipsis",
    },

    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Xarid vaqti</span>
      ),
      dataIndex: "purchase_time",
      key: "purchase_time",
      className: "text-base border-e w-[180px]",
    },
    {
      title: (
        <span className="text-lg font-semibold text-gray-500">Miqdori</span>
      ),
      dataIndex: "quantity",
      key: "quantity",
      className: "text-base border-e w-[100px] text-center",
    },
  ];
  return (
    <div className="overflow-auto shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-t-xl mx-2">
      <Table
        // dataSource={data}
        dataSource={data.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
        columns={columns}
        pagination={false}
        className=""
        scroll={{ x: 3100 }}
      />
    </div>
  );
};
