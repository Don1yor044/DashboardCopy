import { Col, Row } from "antd";
import { IReportList } from "../reportList/reportList";
import { priceFormatter } from "../../../components";

export const ReportCard = ({
  dataCourse,
  category,
}: {
  dataCourse: IReportList[];
  category: string;
}) => {
  return (
    <>
      <Row gutter={[20, 10]}>
        {dataCourse.map((item, index) => (
          <Col span={24} md={8} key={index}>
            <div className="bg-white rounded-xl border-2">
              <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                <div className="flex gap-2 w-full">
                  <div className="w-[35%] border-e text-base bg-slate-400 rounded-s-lg p-3 text-white space-y-2">
                    <div className="border-b"># {index + 1}</div>
                    {item.user_id !== undefined && (
                      <div className="border-b">ID:</div>
                    )}
                    {item.full_name !== undefined && (
                      <div className="border-b">Ism:</div>
                    )}
                    {item.address !== undefined && (
                      <div className="border-b">Manzil:</div>
                    )}
                    {item.phone !== undefined && (
                      <div className="border-b">Telefon raqam:</div>
                    )}{" "}
                    {item.weight !== undefined && (
                      <div className="border-b">Og'irligi:</div>
                    )}
                    {item.count !== undefined && (
                      <div className="border-b">Sanog'i:</div>
                    )}
                    {item.price !== undefined && <div>Narxi:</div>}
                  </div>

                  <div className="w-[65%] text-base py-3 px-2 space-y-2">
                    <div className="border-b">{"\u200B"}</div>
                    {item.user_id !== undefined && (
                      <div className="border-b">{item.user_id || "—"}</div>
                    )}{" "}
                    {item.full_name !== undefined && (
                      <div className="border-b">{item.full_name || "—"}</div>
                    )}{" "}
                    {item.address !== undefined && (
                      <div className="border-b">{item.address || "—"}</div>
                    )}
                    {item.phone !== undefined && (
                      <div className="border-b">{item.phone || "—"}</div>
                    )}
                    {item.weight !== undefined && (
                      <div
                        className={`border-b ${
                          category == "by_weight"
                            ? "text-green-600 font-semibold"
                            : ""
                        }`}
                      >
                        {item.weight || "—"}
                        <span className="text-gray-500 font-semibold"> kg</span>
                      </div>
                    )}
                    <div
                      className={`border-b ${
                        category == "by_count"
                          ? "text-green-600 font-semibold"
                          : ""
                      }`}
                    >
                      {item.count || "—"}
                    </div>
                    {item.price !== undefined && (
                      <div
                        className={`${
                          category == "by_price"
                            ? "text-green-600 font-semibold"
                            : ""
                        }`}
                      >
                        {priceFormatter(Number(item.price)) || "—"}
                        <span className="text-gray-500 font-semibold">
                          {" "}
                          so'm
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};
