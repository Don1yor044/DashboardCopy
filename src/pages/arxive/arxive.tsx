import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import baseURL from "../../utils/api";

export const Arxive = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      return;
    }
    try {
      const res = await baseURL.get(`/api/client/dashboard/all/delivered`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row gutter={[20, 20]}>
      {data.map((item) => (
        <Col span={8} key={item}>
          <div className={`bg-white rounded-xl border-2 `}>
            <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
              <div className="flex gap-2 w-full">
                <div className="absolute right-[0px] top-[0px]">
                  <Button
                    type="default"
                    className={`w-10 h-10 p-0 rounded-tr-xl `}
                    // onClick={() => {
                    //   onSelect(item.id);
                    //   setUserId(item.user_id ?? 0);
                    // }}
                  >
                    <BsCheckLg size={25} />
                  </Button>
                </div>
                <div
                  className={`w-[35%] border-e text-lg bg-[#FE5222] rounded-s-lg p-3 text-white space-y-2 `}
                >
                  <div className="border-b">ID:</div>
                  <div className="border-b">Ism:</div>
                  <div className="border-b">Telefon Raqam:</div>
                  <div className="border-b">Manzil:</div>
                  <div className="border-b">Shahar:</div>
                  <div className="border-b">Og'irligi:</div>
                  <div className="border-b">Track Number:</div>
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
                  <div className="border-b">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b text-red-500 font-semibold">
                    {"—"}
                  </div>
                  <div className="border-b flex justify-between items-center text-green-500 font-semibold">
                    {"—"}
                  </div>
                  <div className="border-b flex text-green-500 font-semibold justify-between items-center">
                    {"—"}
                  </div>
                  <div className="border-b flex text-green-500 font-semibold justify-between items-center">
                    {"—"}
                  </div>
                  <div className="border-b flex justify-between text-green-500 font-semibold items-center">
                    {"—"}
                  </div>
                  <div className="border-b">{"—"}</div>
                  <div className="border-b ">{"—"}</div>
                  <div className="border-b">{"—"}</div>
                  <div>{"—"}</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
