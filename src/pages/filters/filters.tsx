import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Empty,
  Row,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import baseURL from "../../utils/api";
import { useNavigate } from "react-router-dom";

interface Item {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  weight: string;
  express_num: string;
  paid_at: number;
  payment_fee: number | null;
  paid_by_card: number | null;
  paid_by_cash: number | null;
  paid_by_payme: number | null;
  discounted_fee: number | null;
  express_line: string;
  comment: string;
  purchase_time: string;
  quantity: number | null;
}

export const Filters = () => {
  const [region, setRegion] = useState<string>("Region");
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("");
  const navigate = useNavigate();

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }

    try {
      const response = await baseURL.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dashboard = response.data?.data?.data || [];
      setData(dashboard);
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to fetch data. Please try again.");
      setData([]); // Avoid undefined issues
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    setActiveButton("region");
    fetchData(`/api/admin/pda/item/sort/by/region/${value}`);
  };

  const handleDateDesc = () => {
    setActiveButton("desc");
    fetchData(`/api/admin/pda/item/sort/by/date/desc`);
  };
  const handleDateAsc = () => {
    setActiveButton("asc");
    fetchData(`/api/admin/pda/item/sort/by/date/asc`);
  };

  const handlePaymeSort = () => {
    setActiveButton("payme");
    fetchData(`/api/admin/pda/item/sort/by/payment/`);
  };

  const handleCountSort = () => {
    setActiveButton("count");
    fetchData(`/api/admin/pda/item/sort/by/count`);
  };

  useEffect(() => {
    handleRegionChange("1");
  }, []);
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <div className="mt-10 w-full ">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-xl" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-28 text-4xl">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 mt-10 bg-gray-100 p-4 rounded-lg justify-between">
        <div className="px-5">
          <Typography className=" !text-lg font-semibold">
            Viloyat bo'yicha
          </Typography>
          <Select
            defaultValue="Region"
            value={region}
            className="mt-2"
            onChange={handleRegionChange}
            options={[
              { value: "1", label: "Toshkent" },
              { value: "2", label: "Andijon" },
              { value: "3", label: "Namangan" },
              { value: "4", label: "Farg'ona" },
              { value: "5", label: "Sirdaryo" },
              { value: "6", label: "Samarqand" },
              { value: "7", label: "Navoiy" },
              { value: "8", label: "Jizzax" },
              { value: "9", label: "Xorazm" },
              { value: "10", label: "Toshkent viloyati" },
              { value: "11", label: "Surxondaryo" },
              { value: "12", label: "Qashqadaryo" },
              { value: "13", label: "Buxoro" },
              { value: "14", label: "Qoraqalpog'iston" },
            ]}
          />
        </div>
        <div>
          <Typography className=" !text-lg ms-3 font-semibold">
            Vaqt bo'yicha{" "}
          </Typography>
          <div className="flex gap-4 mt-2">
            <Button
              className={
                activeButton === "desc" ? "bg-green-500 text-white " : ""
              }
              onClick={handleDateDesc}
            >
              Yangi
            </Button>
            <Button
              className={
                activeButton === "asc" ? "bg-green-500 text-white" : ""
              }
              onClick={handleDateAsc}
            >
              Eski
            </Button>
          </div>
        </div>
        <div>
          <Typography className=" !text-lg mb-2 font-semibold">
            Kargo puli bo'yicha
          </Typography>
          <Button
            className={
              activeButton === "payme" ? "bg-green-500 text-white" : ""
            }
            onClick={handlePaymeSort}
          >
            Kargo puli
          </Button>
        </div>
        <div>
          <Typography className="!text-lg mb-2 font-semibold">
            Sanog'i bo'yicha
          </Typography>
          <Button
            className={
              activeButton === "count" ? "bg-green-500 text-white" : ""
            }
            onClick={handleCountSort}
          >
            Sanog'i
          </Button>
        </div>
      </div>
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
