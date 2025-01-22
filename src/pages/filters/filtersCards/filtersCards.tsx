import { Col, Row } from "antd";
import { IfiltersData } from "../../../types/types";

export const FiltersCards = ({ data }: { data: IfiltersData[] }) => {
  return (
    <>
      <Row gutter={[20, 20]} className="mt-5">
        {Array.isArray(data) &&
          data.map((item) => (
            <Col span={8} key={item.id}>
              <div className="bg-white rounded-xl border-2">
                <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                  <div className="flex gap-2 w-full">
                    <div className="w-[35%] border-e text-lg bg-yellow-500 rounded-s-lg p-3 text-white space-y-2">
                      <div className="border-b">ID:</div>
                      <div className="border-b">Ism:</div>
                      <div className="border-b">Telefon Raqam:</div>
                      <div className="border-b">Manzil:</div>
                      <div className="border-b">Shahar:</div>
                      <div className="border-b">Og'irligi:</div>
                      <div className="border-b">Status:</div>
                      <div className="border-b">Track Number:</div>
                      <div className="border-b">To'lov Vaqti:</div>
                      <div className="border-b">To'lov summa:</div>
                      <div className="border-b">Karta to'lov:</div>
                      <div className="border-b">Naqt to'lov:</div>
                      <div className="border-b">Payme to'lov:</div>
                      <div className="border-b">Chegirma:</div>
                      <div className="border-b">Avto Kargo:</div>
                      <div className="border-b">Izoh:</div>
                      <div className="border-b">Xarid vaqt:</div>
                      <div>Miqdori:</div>
                    </div>
                    <div className="w-[65%] text-lg py-3 px-2 space-y-2">
                      <div className="border-b">{item.user_id || "—"}</div>
                      <div className="border-b">{item.full_name || "—"}</div>
                      <div className="border-b">{item.phone || "—"}</div>
                      <div className="border-b">{item.address || "—"}</div>
                      <div className="border-b">{item.city || "—"}</div>
                      <div className="border-b">{item.weight || "—"}</div>
                      <div className="border-b">
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
                            default:
                              return "—";
                          }
                        })()}
                      </div>
                      <div className="border-b">{item.express_num || "—"}</div>
                      <div className="border-b">{item.paid_at || "—"}</div>
                      <div className="border-b text-red-500 font-semibold">
                        {item.payment_fee !== null &&
                        item.payment_fee !== undefined
                          ? `${item.payment_fee} so'm`
                          : "—"}
                      </div>
                      <div className="border-b text-green-500 font-semibold">
                        {item.paid_by_card ? `${item.paid_by_card} so'm` : "—"}
                      </div>
                      <div className="border-b text-green-500 font-semibold">
                        {item.paid_by_cash ? `${item.paid_by_cash} so'm` : "—"}
                      </div>
                      <div className="border-b text-green-500 font-semibold">
                        {item.paid_by_payme
                          ? `${item.paid_by_payme} so'm`
                          : "—"}
                      </div>
                      <div className="border-b text-green-500 font-semibold">
                        {item.discounted_fee
                          ? `${item.discounted_fee} so'm`
                          : "—"}
                      </div>
                      <div className="border-b">{item.express_line || "—"}</div>
                      <div className="border-b">{item.comment || "—"}</div>
                      <div className="border-b">
                        {item.purchase_time || "—"}
                      </div>
                      <div>{item.quantity || "—"}</div>
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
