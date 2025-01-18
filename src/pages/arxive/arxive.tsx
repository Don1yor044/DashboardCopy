import { Col, Empty, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import baseURL from "../../utils/api";
import { IDashboards } from "../../types/types";
import searchStore from "../../store/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { priceFormatter } from "../../components/priceFormat/priceFormat";
const kgFormatter = (weight: number) => {
  const kg = weight / 1000;
  return `${new Intl.NumberFormat("uz-UZ").format(kg)} kg`;
};
export const Arxive = observer(() => {
  const [data, setData] = useState<IDashboards[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const search = searchStore.searchArxive;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    setIsloading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }
    let res;
    try {
      if (search) {
        console.log(search);

        res = await baseURL.get(
          `/api/client/dashboard/all/delivered/archive/${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await baseURL.get(`/api/client/dashboard/all/delivered/archive`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (res?.data?.data?.dashboards) {
        const dashboards = res.data.data.dashboards;
        setData(Array.isArray(dashboards) ? dashboards : []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("API chaqiruvi xato: ", error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Row gutter={[20, 20]} className=" flex justify-center items-center">
      {isLoading ? (
        <>
          <Spin size="large" />
        </>
      ) : (
        <>
          {data.length == 0 ? (
            <div className="mt-10">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-xl" />
            </div>
          ) : (
            <>
              {data.map((item) => (
                <Col span={8} key={item.id}>
                  <div className={`bg-white rounded-xl border-2 `}>
                    <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                      <div className="flex gap-2 w-full">
                        {/* <div className="absolute right-[0px] top-[0px]">
                          <Button
                            type="default"
                            className={`w-10 h-10 p-0 rounded-tr-xl `}
                            onClick={() => {
                              onSelect(item.id);
                              setUserId(item.user_id ?? 0);
                            }}
                          >
                            <BsCheckLg size={25} />
                          </Button>
                        </div> */}
                        <div
                          className={`w-[35%] border-e text-lg bg-yellow-500 rounded-s-lg p-3 text-white space-y-2 `}
                        >
                          <div className="border-b">ID:</div>
                          <div className="border-b">Ism:</div>
                          <div className="border-b">Telefon Raqam:</div>
                          <div className="border-b">Manzil:</div>
                          <div className="border-b">Shahar:</div>
                          <div className="border-b">Og'irligi:</div>
                          <div className="border-b">Track Number:</div>
                          <div className="border-b">To'langan Vaqti:</div>
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
                          <div className="border-b">
                            {item.full_name || "—"}
                          </div>
                          <div className="border-b">{item.phone || "—"}</div>
                          <div className="border-b">{item.address || "—"}</div>
                          <div className="border-b">{item.city || "—"}</div>
                          <div className="border-b">
                            {kgFormatter(Number(item.weight)) || "—"}
                          </div>
                          <div className="border-b">
                            {item.express_num || "—"}
                          </div>{" "}
                          <div className="border-b">{item.paid_at || "—"}</div>
                          <div className="border-b text-red-500 font-semibold">
                            {item.payment_fee !== null &&
                            item.payment_fee !== undefined
                              ? `${priceFormatter(item.payment_fee)} so'm`
                              : "—"}
                          </div>
                          <div className="border-b  text-green-500 font-semibold">
                            {item.paid_by_card === null ||
                            item.paid_by_card === 0
                              ? "—"
                              : `${priceFormatter(
                                  Number(item.paid_by_card)
                                )} so'm`}
                          </div>
                          <div className="border-b  text-green-500 font-semibold ">
                            {item.paid_by_cash === null ||
                            item.paid_by_cash === 0
                              ? "—"
                              : `${priceFormatter(
                                  Number(item.paid_by_cash)
                                )} so'm`}
                          </div>
                          <div className="border-b  text-green-500 font-semibold ">
                            {item.paid_by_payme === null ||
                            item.paid_by_payme === 0
                              ? "—"
                              : `${priceFormatter(
                                  Number(item.paid_by_payme)
                                )} so'm`}
                          </div>
                          <div className="border-b  text-green-500 font-semibold ">
                            {item.discounted_fee === null ||
                            item.discounted_fee === 0
                              ? "—"
                              : `${priceFormatter(
                                  Number(item.discounted_fee)
                                )} so'm`}
                          </div>
                          <div className="border-b">
                            {item.express_line || "—"}
                          </div>
                          <div className="border-b ">{item.comment || "—"}</div>
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
            </>
          )}
        </>
      )}
    </Row>
  );
});
