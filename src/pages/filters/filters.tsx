import { useState, useEffect } from "react";
import { Col, Row, Select, message } from "antd";
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
  const navigate = useNavigate();

  const handleChange = async (value: string) => {
    setRegion(value);
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }

    try {
      const response = await baseURL.get(
        `/api/admin/pda/item/sort/by/region/${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      console.log("API Response:", response.data.data.data);
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

  useEffect(() => {
    handleChange("1");
  }, []);

  return (
    <>
      <div className="flex gap-3 mt-10">
        <Select
          defaultValue="Region"
          value={region}
          style={{ width: 120 }}
          onChange={handleChange}
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
      <Row gutter={[20, 20]} className="mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          Array.isArray(data) &&
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
          ))
        )}
      </Row>
    </>
  );
};
