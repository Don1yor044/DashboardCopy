import { Button, Col, Row, Typography } from "antd";
import { BsBoxSeam, BsCheckLg } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TbCashBanknote } from "react-icons/tb";
import baseURL from "../../../utils/api";
import { useEffect, useState } from "react";

import { MdOutlineDiscount } from "react-icons/md";
interface BranchData {
  id: number;
  name: string;
  payment_fee: number;
  deliveredOrders: number;
  receivedOrders: number;
  paid_payment_fee: number;
  paid_by_card: number;
  paid_by_payme: number;
  paid_by_cash: number;
  delivered_item_counts: number;
  received_item_counts: number;
}

export const FilialsCards = () => {
  // Null bo'lmasligi uchun bo'sh array bilan ishga tushiramiz
  const [dataCourse, setDataCourse] = useState<BranchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token is missing or invalid");
      setIsLoading(false);
      return;
    }

    try {
      const response = await baseURL.get(`/api/admin/pda/branch/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      // API dan kelgan ma'lumotlarni tekshiramiz
      console.log(response.data.data);

      if (Array.isArray(response.data.data)) {
        setDataCourse(response.data.data);
      } else if (response.data.data) {
        setDataCourse([response.data.data]);
      } else {
        setDataCourse([]); // Data yo'q bo'lsa bo'sh array qo'yamiz
      }
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  // Data yo'q bo'lsa
  if (!dataCourse || dataCourse.length === 0) {
    return <div className="flex justify-center p-8">No data available</div>;
  }

  return (
    <Row gutter={[20, 20]} className="mt-10">
      {dataCourse.map((item) => (
        <Col xl={8} span={12} key={item.id || Math.random()}>
          <div className="rounded-3xl border-2 border-gray-300 hover:border-red-500">
            <div className="bg-[#FE5222] p-5 rounded-t-3xl">
              <Typography.Title level={2} className="!text-white">
                {item.name || "Shota Rustaveli"}
              </Typography.Title>
              <div className="flex justify-between">
                <div className="space-y-3">
                  <Typography className="text-xl font-bold text-white">
                    Payment Fee
                  </Typography>
                  <Typography className="text-xl font-bold text-white">
                    Paid Payment Fee
                  </Typography>
                </div>
                <div className="flex flex-col items-end">
                  <Typography className="text-3xl font-bold text-white">
                    {item.payment_fee} <span className="text-lg">so'm</span>
                  </Typography>
                  <Typography className="text-3xl font-bold text-white">
                    {item.paid_payment_fee}{" "}
                    <span className="text-lg">so'm</span>
                  </Typography>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white rounded-b-3xl">
              <div>
                <div className="flex border-b-2 justify-between items-center py-2">
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                      <HiOutlineCreditCard size={22} color="white" />
                    </div>
                    <Typography className="text-lg font-semibold">
                      Karta orqali
                    </Typography>
                  </div>
                  <Typography className="text-3xl font-bold text-black">
                    {item.paid_by_card}{" "}
                    <span className="text-xl text-[#797979]">so'm</span>
                  </Typography>
                </div>
                <div className="flex border-b-2 justify-between py-2">
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                      <img
                        src="./PaymeIconSvg.svg"
                        alt="payme"
                        className="w-[85%]"
                      />
                    </div>
                    <Typography className="text-lg font-semibold">
                      Payme orqali
                    </Typography>
                  </div>
                  <Typography className="text-3xl font-bold text-black">
                    {item.paid_by_payme}{" "}
                    <span className="text-xl text-[#797979]">so'm</span>
                  </Typography>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                      <TbCashBanknote size={22} color="white" />
                    </div>
                    <Typography className="text-lg font-semibold">
                      Naqt orqali
                    </Typography>
                  </div>
                  <Typography className="text-3xl font-bold text-black">
                    {item.paid_by_cash}{" "}
                    <span className="text-xl text-[#797979]">so'm</span>
                  </Typography>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                      <MdOutlineDiscount size={22} color="white" />
                    </div>
                    <Typography className="text-lg font-semibold">
                      Discounted
                    </Typography>
                  </div>
                  <Typography className="text-3xl font-bold text-black">
                    {item.paid_by_cash}{" "}
                    <span className="text-xl text-[#797979]">so'm</span>
                  </Typography>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between items-center py-1">
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                      <CiDeliveryTruck size={25} color="white" />
                    </div>
                    <Typography className="text-lg font-semibold">
                      Deliveryed orders
                    </Typography>
                  </div>
                  <Typography className="text-4xl font-bold text-black">
                    <span className="text-[#FE5222]">
                      {item.delivered_item_counts || "0"}
                    </span>{" "}
                    ta
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                      <BsBoxSeam size={22} color="white" />
                    </div>
                    <Typography className="text-lg font-semibold">
                      Received orders
                    </Typography>
                  </div>
                  <Typography className="text-4xl font-bold text-black">
                    <span className="text-[#FE5222]">
                      {item.received_item_counts || "0"}
                    </span>{" "}
                    ta
                  </Typography>
                </div>
                <div className="flex justify-end mt-7">
                  <Button type="default" className="w-9 h-9 p-0">
                    <BsCheckLg size={25} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
