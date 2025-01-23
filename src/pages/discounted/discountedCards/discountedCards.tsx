import { Col, Row } from "antd";
import { IDashboards } from "../../../types/types";
import { priceFormatter } from "../../../components/priceFormat/priceFormat";
import { kgFormatter } from "../../../components";

export const DiscountedCards = ({ data }: { data: IDashboards[] }) => {
  return (
    <>
      <Row gutter={[20, 20]} className="mt-10">
        {data.map((item, index) => (
          <Col xl={8} span={12} key={index}>
            <div className={`bg-white rounded-xl border-2 `}>
              <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                <div className="flex gap-2 w-full">
                  <div
                    className={`w-[35%] border-e text-lg bg-slate-400 rounded-s-lg p-3 text-white space-y-2 `}
                  >
                    <div className="border-b">ID:</div>
                    <div className="border-b">Ism:</div>
                    <div className="border-b">Telefon Raqam:</div>
                    <div className="border-b">Manzil:</div>
                    <div className="border-b">Shahar:</div>
                    <div className="border-b">Og'irligi:</div>
                    <div className="border-b">Status:</div>
                    <div className="border-b">Track Number:</div>
                    <div className="border-b">To'langan Vaqti:</div>
                    <div className="border-b">To'lov summa:</div>
                    <div className="border-b">Karta to'lov:</div>
                    <div className="border-b">Naqt to'lov:</div>
                    <div className="border-b">Payme to'lov:</div>
                    <div className="border-b font-bold text-black">
                      Chegirma:
                    </div>
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
                    <div className="border-b">
                      {kgFormatter(Number(item.weight)) || "—"}
                    </div>
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
                    <div className="border-b">{item.express_num || "—"}</div>{" "}
                    <div className="border-b">{item.paid_at || "—"}</div>
                    <div className="border-b text-red-500 font-semibold">
                      {item.payment_fee !== null &&
                      item.payment_fee !== undefined
                        ? `${priceFormatter(item.payment_fee)} so'm`
                        : "—"}
                    </div>
                    <div className="border-b  text-green-500 font-semibold">
                      {item.paid_by_card === null || item.paid_by_card === 0
                        ? "—"
                        : `${priceFormatter(Number(item.paid_by_card))} so'm`}
                    </div>
                    <div className="border-b  text-green-500 font-semibold ">
                      {item.paid_by_cash === null || item.paid_by_cash === 0
                        ? "—"
                        : `${priceFormatter(Number(item.paid_by_cash))} so'm`}
                    </div>
                    <div className="border-b  text-green-500 font-semibold ">
                      {item.paid_by_payme === null || item.paid_by_payme === 0
                        ? "—"
                        : `${priceFormatter(Number(item.paid_by_payme))} so'm`}
                    </div>
                    <div className="border-b  text-green-500 font-bold ">
                      {item.discounted_fee === null || item.discounted_fee === 0
                        ? "—"
                        : `${priceFormatter(Number(item.discounted_fee))} so'm`}
                    </div>
                    <div className="border-b">{item.express_line || "—"}</div>
                    <div className="border-b ">{item.comment || "—"}</div>
                    <div className="border-b">{item.purchase_time || "—"}</div>
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
