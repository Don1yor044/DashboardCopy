import dayjs, { Dayjs } from "dayjs";
import { IPayme } from "../paymeTable/paymeTable";
import { Col, DatePicker, Empty, Row, Typography } from "antd";
import { priceFormatter } from "../../../components";
const { RangePicker } = DatePicker;

export const PaymeCard = ({
  data,
  dates,
  totalAmount,
  handleDateChange,
}: {
  data: IPayme[];
  dates: [Dayjs, Dayjs];
  totalAmount: number | undefined;
  handleDateChange: (
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => void;
}) => {
  return (
    <>
      <div className="rounded-xl shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
        <div className="p-4 bg-gray-100 justify-between rounded-t-xl flex flex-col md:flex-row md:justify-between gap-2">
          <RangePicker
            value={dates}
            onChange={handleDateChange}
            placeholder={["Boshalanishi", "Tugashi"]}
            className="p-2 text-xl"
            format="YYYY-MM-DD HH:mm"
            showTime={{ format: "HH:mm" }}
          />
          <div className="p-2 px-5 bg-white rounded-lg flex gap-1 items-center justify-between">
            <Typography className="text-lg font-semibold md:border-e pe-5 border-black">
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
        {data.length < 1 ? (
          <div className="!py-5">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-xl" />
          </div>
        ) : (
          <>
            <Row gutter={[20, 10]} className="mb-40 md:mb-0">
              {data.map((item, index) => (
                <Col span={24} md={8} key={index}>
                  <div className="bg-white rounded-xl border-2">
                    <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                      <div className="flex gap-2 w-full">
                        <div className="w-[35%] border-e text-base bg-slate-400 rounded-s-lg p-3 text-white space-y-2">
                          <div className="border-b">ID:</div>
                          <div className="border-b">Ism:</div>
                          <div className="border-b">Miqdor:</div>
                          <div className="border-b">Weight:</div>
                          <div className="border-b">Status:</div>
                          <div className="border-b">Track number:</div>
                          <div className="border-b"> To'langan vaqti :</div>
                          <div>Paycom_transaction_id:</div>
                        </div>

                        <div className="w-[65%] text-base py-3 px-2 space-y-2">
                          <div className="border-b">{item.user_id || "—"}</div>
                          <div className="border-b">
                            {item.full_name || "—"}
                          </div>
                          <div className="border-b">{item.amount || "—"}</div>
                          <div className="border-b">{item.weight || "—"}</div>
                          <div className="border-b ">
                            <Typography className="text-base text-green-500">
                              To'langan
                            </Typography>
                          </div>
                          <div className="border-b">
                            {item.express_num || "—"}
                          </div>
                          <div className="border-b">
                            {" "}
                            {item.perform_at
                              ? new Date(item.perform_at)
                                  .toISOString()
                                  .replace("T", " ")
                                  .substring(0, 19)
                              : "—"}
                          </div>

                          <div>{item.paycom_transaction_id || "—"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </>
  );
};
