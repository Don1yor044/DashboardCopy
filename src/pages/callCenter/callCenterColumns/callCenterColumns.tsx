import { ColumnsType } from "antd/es/table";

interface OrderRecord {
  user_id: string;
  receiver_name: string;
  order_sn: string;
  actual_weight: number;
  actual_payment_fee: number;
  address: {
    phone: string;
    area: {
      name: string;
    };
    sub_area: {
      name: string;
    };
  };
  shipment: {
    shipped_at: string;
  };
  express_line: {
    name: string;
  };
  address_type: string;
  status_name: string;
  updated_at: string;
  packed_at: string;
  paid_at: string;
  shipped_at: string;
  signed_at: string;
}
export const tableColumns: ColumnsType<OrderRecord> = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    className: "text-base border-e w-10",
    render: (_: string, __: OrderRecord, index: number) => index + 1,
  },
  {
    title: <span className="text-lg font-semibold text-gray-500">User_id</span>,
    dataIndex: "user_id",
    key: "user_id",
    className: "text-base border-e w-12",
  },
  {
    title: <span className="text-lg font-semibold text-gray-500">Ism</span>,
    dataIndex: ["address", "receiver_name"],
    key: "receiver_name",
    className:
      "text-base border-e whitespace-nowrap overflow-hidden text-ellipsis",
    render: (name: string) => {
      return <div>{name}</div>;
    },
  },
  {
    title: (
      <span className="text-lg font-semibold text-gray-500">order_sn</span>
    ),
    dataIndex: "order_sn",
    key: "order_sn",
    className:
      "text-base border-e whitespace-nowrap overflow-hidden text-ellipsis",
  },
  {
    title: (
      <span className="text-lg font-semibold text-gray-500">Og'irligi</span>
    ),
    dataIndex: "actual_weight",
    key: "actual_weight",
    className: "text-base border-e text-center",
    render: (w: number) => <div>{w} gr</div>,
  },
  {
    title: (
      <span className="text-lg font-semibold text-red-500">To'lov summa</span>
    ),
    dataIndex: "actual_payment_fee",
    key: "actual_payment_fee",
    className: "text-base border-e text-center font-semibold",
  },
  {
    title: (
      <span className="text-lg font-semibold text-gray-500">
        Telefon raqami
      </span>
    ),
    dataIndex: ["address", "phone"],
    key: "phone",
    className: "text-base border-e  text-center",
  },
  {
    title: <span className="text-lg font-semibold text-gray-500">Manzil</span>,
    dataIndex: ["address", "area", "name"],
    key: "address",
    className: "text-base border-e",
  },
  {
    title: <span className="text-lg font-semibold text-gray-500">Tumani</span>,
    dataIndex: ["address", "sub_area", "name"],
    key: "address",
    className: "text-base border-e",
  },
  {
    title: (
      <span className="text-lg font-semibold text-gray-500">express_line</span>
    ),
    dataIndex: ["express_line", "name"],
    key: "name",
    className: "text-base border-e text-center",
  },
  {
    title: <span className="text-lg font-semibold text-gray-500">Vaqtlar</span>,
    key: "times",
    className: "text-base border-e text-center",
    render: (
      _: string,
      record: {
        updated_at: string;
        packed_at: string;
        paid_at: string;
        shipped_at: string;
        signed_at: string;
      }
    ) => (
      <div className="flex flex-col items-center">
        <p className="text-gray-400">
          Yangilangan:{" "}
          <span className="text-black">{record.updated_at || "—"}</span>
        </p>{" "}
        <p className="text-gray-400">
          Paketlangan:{" "}
          <span className="text-black">{record.packed_at || "—"}</span>
        </p>{" "}
        <p className="text-gray-400">
          To'langan: <span className="text-black">{record.paid_at || "—"}</span>
        </p>{" "}
        <p className="text-gray-400">
          Jo'natilgan:{" "}
          <span className="text-black">{record.shipped_at || "—"}</span>
        </p>{" "}
        <p className="text-gray-400">
          Olib ketilgan:{" "}
          <span className="text-black">{record.signed_at || "—"}</span>
        </p>
      </div>
    ),
  },
];
