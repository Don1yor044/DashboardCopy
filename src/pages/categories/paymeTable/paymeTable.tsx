import baseURL from "../../../utils/api";
import { useEffect, useState } from "react";
import { errorToast } from "../../../components/toastManager";
import dayjs from "dayjs";
import { PaymeList } from "../paymeList/paymeList";
import { PaymeCard } from "../paymeCard/paymeCard";
import { HiMiniBars3 } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";
import { Segmented } from "antd";

export interface IPayme {
  id: number;
  created_at: string;
  express_num: string;
  amount: number;
  perform_at: string;
  weight: number;
  full_name: string;
  purchase_time: string;
  user_id: number;
  paycom_transaction_id: string;
}

export const PaymeTable = () => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf("day"),
    dayjs().endOf("day"),
  ]);
  const [totalAmount, setTotalAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [segmentValue, setSegmentValue] = useState(
    window.innerWidth <= 768 ? "app" : "list"
  );

  useEffect(() => {
    const handleResize = () => {
      setSegmentValue(window.innerWidth <= 768 ? "app" : "list");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = async (startDate?: string, endDate?: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return errorToast("token yo'q");
    }
    setLoading(true);
    try {
      const res = await baseURL.get(
        `/api/client/dashboard/payment/report/?from=${startDate}&to=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalAmount(res.data.total_amount);
      console.log(res.data);
      setData(res.data.report);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (value && value[0] && value[1]) {
      setDates([value[0], value[1]]);
      fetchData(
        value[0].format("YYYY-MM-DD HH:mm:ss"),
        value[1].format("YYYY-MM-DD HH:mm:ss")
      );
    }
  };

  useEffect(() => {
    const startDate = dates[0].format("YYYY-MM-DD HH:mm:ss");
    const endDate = dates[1].format("YYYY-MM-DD HH:mm:ss");
    fetchData(startDate, endDate);
  }, []);

  return (
    <>
      <div className="hidden md:flex justify-end me-3">
        <Segmented
          value={segmentValue}
          className="p-1"
          onChange={(e) => setSegmentValue(e)}
          options={[
            {
              value: "list",
              icon: <HiMiniBars3 size={18} className="mt-1" />,
            },
            {
              value: "app",
              icon: <AiOutlineAppstore size={18} className="mt-1" />,
            },
          ]}
        />
      </div>
      {segmentValue === "list" ? (
        <>
          <PaymeList
            data={data}
            loading={loading}
            dates={dates}
            totalAmount={totalAmount}
            handleDateChange={handleDateChange}
          />
        </>
      ) : (
        <>
          <div className="mt-2">
            <PaymeCard
              data={data}
              dates={dates}
              totalAmount={totalAmount}
              handleDateChange={handleDateChange}
            />
          </div>
        </>
      )}
    </>
  );
};
