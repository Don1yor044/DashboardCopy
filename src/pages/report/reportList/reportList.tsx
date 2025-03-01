import { Table } from "antd";
import { priceFormatter } from "../../../components";

export interface IReportList {
  address: string | number;
  count: string | number;
  full_name?: string | number;
  phone?: string | string | number;
  price?: string | number;
  user_id?: string | number;
  weight?: string | number;
}

export const ReportList = ({
  dataCourse,
  category,
}: {
  dataCourse: IReportList[];
  category: string;
}) => {
  const columns = [
    {
      title: "#",
      dataIndex: "count",
      key: "count",
      className: "text-base border-e w-10",
      render: (_: string, __: IReportList, index: number) => index + 1,
    },

    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      className: "text-base border-e",
    },
    {
      title: "Ism",
      dataIndex: "full_name",
      key: "full_name",
      className: "text-base border-e",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
      className: "text-base border-e",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phone",
      key: "phone",
      className: "text-base border-e",
    },
    {
      title: "Og'irligi",
      dataIndex: "weight",
      key: "weight",
      className:
        category === "by_weight"
          ? "border-e text-green-600 font-semibold text-base"
          : "border-e text-base",
      render: (w: number) => (
        <div className="flex gap-2 items-center">
          {w} <span className="text-gray-500 font-semibold">kg</span>
        </div>
      ),
    },
    {
      title: "Sanog'i",
      dataIndex: "count",
      key: "count",
      className:
        category === "by_count"
          ? "border-e text-green-600 font-semibold text-base"
          : "border-e text-base",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      className:
        category === "by_price"
          ? "border-e text-green-600 font-semibold text-base"
          : "border-e text-base",
      render: (price: number) => (
        <div className="flex gap-2">
          {priceFormatter(price)}{" "}
          <span className="font-semibold text-gray-500">so'm</span>
        </div>
      ),
    },
  ];

  const filteredColumns = columns.filter((column) => {
    if (column.render) {
      return dataCourse.some(
        (item) => item[column.dataIndex as keyof IReportList] !== undefined
      );
    } else {
      return dataCourse.some(
        (item) => item[column.dataIndex as keyof IReportList] !== undefined
      );
    }
  });

  return (
    <Table
      dataSource={dataCourse}
      columns={filteredColumns}
      pagination={false}
      rowKey="user_id"
    />
  );
};
