import { DatePicker, Table, Typography } from "antd";
import { IPayme } from "../paymeTable/paymeTable";
import { priceFormatter } from "../../../components";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

export const PaymeList = ({
  data,
  loading,
  dates,
  totalAmount,
  handleDateChange,
}: {
  data: IPayme[];
  loading: boolean;
  dates: [Dayjs, Dayjs];
  totalAmount: number | undefined;
  handleDateChange: (
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => void;
}) => {
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      className: "text-base border-e w-10",
      render: (_: string, __: IPayme, index: number) => index + 1,
    },
    {
      title: (
        <span className="text-xl font-semibold text-gray-500">User_id</span>
      ),
      dataIndex: "user_id",
      key: "user_id",
      className: "text-base border-e",
    },
    {
      title: (
        <span className="text-xl font-semibold text-gray-500">Full_name</span>
      ),
      dataIndex: "full_name",
      key: "full_name",
      className: "text-base border-e",
    },

    {
      title: (
        <span className="text-xl font-semibold text-gray-500">Miqdor</span>
      ),
      dataIndex: "amount",
      key: "amount",
      className: "text-base border-e",
      render: (miqdor: string) => (
        <div>
          {priceFormatter(Number(miqdor))}{" "}
          <span className="font-semibold text-gray-600">so'm</span>
        </div>
      ),
    },
    {
      title: (
        <span className="text-xl font-semibold text-gray-500">Weight</span>
      ),
      dataIndex: "weight",
      key: "weight",
      className: "text-base border-e",
      render: (record: number) => <div>{record} gr</div>,
    },
    {
      title: (
        <span className="text-xl font-semibold text-gray-500">Status</span>
      ),
      dataIndex: "status",
      key: "status",
      className: "border-e",
      render: () => (
        <div className="flex justify-center">
          <div className="text-white font-semibold w-[100%] flex justify-center rounded-md bg-green-500">
            To'langan
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="text-xl font-semibold text-gray-500">
          Track number
        </span>
      ),
      dataIndex: "express_num",
      key: "express_num",
      className: "text-base border-e",
    },
    {
      title: (
        <span className="text-xl font-semibold text-gray-500">
          To'langan vaqti
        </span>
      ),
      dataIndex: "perform_at",
      key: "perform_at",
      className: "text-base border-e",
      render: (text: string) => {
        if (!text) return "-";
        const date = new Date(text);
        const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
        return formattedDate;
      },
    },

    {
      title: (
        <span className="text-xl font-semibold text-gray-500">
          paycom_transaction_id
        </span>
      ),
      dataIndex: "paycom_transaction_id",
      key: "paycom_transaction_id",
      className: "text-base border-e",
    },
  ];
  return (
    <>
      <div className="shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-t-xl mt-5">
        <div className="bg-gray-100 p-4 flex flex-col md:flex-row md:justify-between rounded-t-xl gap-2">
          <div className="w-full sm:w-auto">
            <RangePicker
              value={dates}
              onChange={handleDateChange}
              placeholder={["Boshalanishi", "Tugashi"]}
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              className="p-2 text-xl w-full sm:w-auto"
            />
          </div>
          <div className="p-2 px-5 bg-white rounded-lg flex gap-2 items-center justify-between">
            <Typography className="text-lg font-semibold md:border-e pe-5 border-black ">
              Jami summa
            </Typography>
            <Typography className="text-base font-semibold">
              {priceFormatter(Number(totalAmount))}{" "}
              <span className="text-base font-semibold text-gray-600">
                so'm
              </span>
            </Typography>
          </div>
        </div>

        <Table<IPayme>
          dataSource={data.map((item: IPayme, index) => ({
            ...item,
            key: item.id || index,
          }))}
          columns={columns}
          pagination={false}
          rowClassName="hover:bg-gray-200"
          loading={loading}
        />
      </div>
    </>
  );
};
