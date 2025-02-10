import { Col, Row } from "antd";
import { IDashboards } from "../../../../types/types";
import { priceFormatter } from "../../../../components";

export const CardItemsMobile = ({
  dataCourse,
}: {
  dataCourse: IDashboards[];
}) => {
  return (
    <Row gutter={[10, 10]}>
      {dataCourse.map((item) => (
        <Col key={item.id} span={24}>
          <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
            <div className="flex gap-2 w-full">
              <div
                className={`w-[40%] border-e text-base bg-[#FE5222] rounded-s-lg p-3 text-white space-y-2`}
              >
                <div className="border-b">ID:</div>
                <div className="border-b">Ism:</div>
                <div className="border-b ">Telefon Raqam:</div>
                <div className="border-b">Status:</div>
                <div className="border-b">Xarid vaqt:</div>
                <div>To'lov summa:</div>
              </div>
              <div className="w-[60%] text-base py-3 px-2 space-y-2">
                <div className="border-b">{item.user_id || "—"}</div>
                <div className="border-b">{item.full_name || "—"}</div>
                <div className="border-b">{item.phone || "—"}</div>
                <div className="border-b flex justify-between">
                  {(() => {
                    switch (item.status) {
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
                <div className="border-b">{item.paid_at || "—"}</div>
                <div className=" text-red-500 font-semibold">
                  {item.payment_fee !== null && item.payment_fee !== undefined
                    ? `${priceFormatter(item.payment_fee)} so'm`
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
