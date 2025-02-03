import { DatePicker, Select, Table } from "antd";
import { RxDownload } from "react-icons/rx";
const { RangePicker } = DatePicker;

const dataCourse = [
  {
    id: 1,
    name: "donik",
    date: "01.01.2025",
    status: true,
    order_Id: "22155544",
    miqdor: "1 105 989.00",
    cargo: "cargo patments",
    cardNumber: "9600 **** **** 8161",
    comment: "",
  },
  {
    id: 2,
    name: "donik2",
    date: "02.01.2025",
    status: false,
    order_Id: "22155544",
    miqdor: "1 105 989.00",
    cargo: "cargo patments",
    cardNumber: "9600 **** **** 8161",
    comment: "",
  },
  {
    id: 3,
    name: "donik3",
    date: "03.01.2025",
    status: true,
    order_Id: "22155544",
    miqdor: "1 105 989.00",
    cargo: "cargo patments",
    cardNumber: "9600 **** **** 8161",
    comment: "",
  },
  {
    id: 4,
    name: "donik4",
    date: "04.01.2025",
    status: false,
    order_Id: "22155544",
    miqdor: "1 105 989.00",
    cargo: "cargo patments",
    cardNumber: "",
    comment: "",
  },
];
const columns = [
  {
    title: <span className="text-xl font-semibold text-gray-500">Tarix</span>,
    dataIndex: "date",
    key: "date",
    className: "text-base border-e",
  },
  {
    title: <span className="text-xl font-semibold text-gray-500">Status</span>,
    dataIndex: "status",
    key: "status",
    render: (s: boolean) => (
      <div className="flex justify-center">
        <div
          className={` text-white font-semibold w-[60%] flex justify-center rounded-md  ${
            s == true ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {s ? "To'langan" : "To'lanmagan"}
        </div>
      </div>
    ),
  },
  {
    title: (
      <span className="text-xl font-semibold text-gray-500">Order_Id</span>
    ),
    dataIndex: "order_Id",
    key: "order_Id",
    className: "text-base border-e border-s",
  },
  {
    title: <span className="text-xl font-semibold text-gray-500">Miqdor</span>,
    dataIndex: "miqdor",
    key: "miqdor",
    className: "text-base border-e",
    render: (miqdor: string) => (
      <div>
        {miqdor} <span className="font-semibold text-gray-600">so'm</span>
      </div>
    ),
  },
  {
    title: <span className="text-xl font-semibold text-gray-500">G'azna</span>,
    dataIndex: "cargo",
    key: "cargo",
    className: "text-base border-e",
  },
  {
    title: (
      <span className="text-xl font-semibold text-gray-500">Karta raqami</span>
    ),
    dataIndex: "cardNumber",
    key: "cardNumber",
    className: "text-base border-e",
    render: (card: string) => <div>{card.length > 0 ? card : "Yo'q"}</div>,
  },
  {
    title: <span className="text-xl font-semibold text-gray-500">Tavsif</span>,
    dataIndex: "comment",
    key: "comment",
    className: "text-base border-e",
  },
];
export const CategoriesTable = () => {
  return (
    <div className="shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-t-xl">
      <div className="bg-gray-100 p-4 flex justify-between rounded-t-xl">
        <div className="flex gap-3 items-center">
          <RangePicker
            placeholder={["Boshalanishi", "Tugashi"]}
            className="p-2 text-xl "
          />
          <Select
            style={{ width: 120 }}
            defaultValue={"Xar qanday holat"}
            className="h-10 !text-xl min-w-40 "
            options={[
              { value: "Doniyor", label: "Doniyor" },
              { value: "Doniyor1", label: "Doniyor1" },
              { value: "Doniyor2", label: "Doniyor2" },
            ]}
          />
        </div>
        <div className="bg-green-300 p-2 font-semibold px-4 rounded-lg text-green-700 text-base flex gap-3 items-center cursor-po">
          Eksport <RxDownload size={22} />
        </div>
      </div>
      <Table
        dataSource={dataCourse}
        columns={columns}
        pagination={false}
        rowClassName="hover:bg-gray-200"
      />
    </div>
  );
};
