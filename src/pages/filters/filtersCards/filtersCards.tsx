import { Col, Row } from "antd";
import { IfiltersData } from "../../../types/types";

export const FiltersCards = ({ data }: { data: IfiltersData[] }) => {
  return (
    <>
      <Row gutter={[20, 20]} className="mt-5">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Col span={8} key={index}>
              <div className="bg-white rounded-xl border-2">
                <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                  <div className="flex gap-2 w-full">
                    <div className="w-[35%] border-e text-lg bg-yellow-500 rounded-s-lg p-3 text-white space-y-2">
                      <div className="border-b">ID:</div>
                      <div className="border-b">Ism:</div>
                      <div className="border-b">Manzil:</div>
                      <div className="border-b">Shahar:</div>
                      <div className="border-b">Soni:</div>
                      <div>To'lov sanasi:</div>
                    </div>
                    <div className="w-[65%] text-lg py-3 px-2 space-y-2">
                      <div className="border-b">{item.user_id || "—"}</div>
                      <div className="border-b">{item.full_name || "—"}</div>
                      <div className="border-b">{item.address || "—"}</div>
                      <div className="border-b">{item.city || "—"}</div>

                      <div className="border-b">{item.express_num || "—"}</div>
                      <div>{item.purchase_time || "—"}</div>
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
