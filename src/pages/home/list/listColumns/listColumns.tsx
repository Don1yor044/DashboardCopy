import { Button } from "antd";
import { IDashboards } from "../../../../types/types";
import { BsCheckLg } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { priceFormatter } from "../../../../components";

export const ListColumns = (
  isSelected: number[],
  onSelect: (id: number) => void,
  setUserId: (id: number) => void,
  showDrawer: (record: IDashboards) => void
) => [
  [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      className: "text-base border-e w-10",
      render: (_: string, __: IDashboards, index: number) => index + 1,
    },
    {
      title: "Action",
      className: "text-base border-e w-12 !p-3",
      key: "dataCourse",
      render: (record: IDashboards) => (
        <div className="flex gap-2 m-0">
          <Button
            className={`p-1  ${
              isSelected.includes(record.id)
                ? "text-green-500 border-green-500"
                : "text-[#FE5222] border-[#FE5222]"
            }`}
            onClick={() => {
              onSelect(record.id);
              setUserId(record.user_id ?? 0);
            }}
          >
            <BsCheckLg size={22} />
          </Button>
          <Button
            className="p-1"
            onClick={() => {
              showDrawer(record);
            }}
          >
            <CiEdit size={22} />
          </Button>
        </div>
      ),
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
      title: <span className="text-lg font-semibold text-gray-500">Ism</span>,
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
      className: "text-base border-e w-[150px] text-center font-semibold",
      render: (p: number, record: { id: number }) => (
        <div
          className={
            isSelected.includes(record.id) ? "!text-white" : "text-red-500"
          }
        >
          {priceFormatter(p)}
        </div>
      ),
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
      render: (p: number, record: { id: number }) => (
        <div
          className={
            isSelected.includes(record.id) ? "!text-white" : "text-green-500"
          }
        >
          {priceFormatter(p)}
        </div>
      ),
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
      render: (p: number, record: { id: number }) => (
        <div
          className={
            isSelected.includes(record.id) ? "!text-white" : "text-green-500"
          }
        >
          {priceFormatter(p)}
        </div>
      ),
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
      render: (p: number, record: { id: number }) => (
        <div
          className={
            isSelected.includes(record.id) ? "!text-white" : "text-green-500"
          }
        >
          {priceFormatter(p)}
        </div>
      ),
    },
    {
      title: (
        <span className="text-lg font-semibold text-green-500 ">Chegirma</span>
      ),
      dataIndex: "discounted_fee",
      key: "discounted_fee",
      className:
        "text-base border-e w-[140px] text-center text-green-500 font-semibold",
      render: (p: number, record: { id: number }) => (
        <div
          className={
            isSelected.includes(record.id) ? "!text-white" : "text-green-500"
          }
        >
          {priceFormatter(p)}
        </div>
      ),
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
  ],
];
