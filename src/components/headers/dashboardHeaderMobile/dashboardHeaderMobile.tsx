import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../utils/api";
import dayjs from "dayjs";
import { priceFormatter } from "../../priceFormat/priceFormat";
import { kgFormatter } from "../../kgFormat";
import { Typography, Button } from "antd";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const DashboardHeaderMobile = observer(() => {
  const [dailyWeight, setDailyWeight] = useState(0);
  const [dailyStay, setDailyStay] = useState(0);
  const [dailyAmount, setDailyAmount] = useState(0);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const todayStart = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
    const todayEnd = dayjs()
      .add(1, "day")
      .add(3, "hour")
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    setDateFrom(todayStart);
    setDateTo(todayEnd);
  }, []);

  useEffect(() => {
    if (dateFrom && dateTo) {
      fetchData();
    }
  }, [dateFrom, dateTo]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const response = await baseURL.get(
        `/api/admin/pda/branch/show/?from=${dateFrom}&to=${dateTo}`,
        {
          params: {
            from: dateFrom,
            to: dateTo,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data[0] || {};
      setDailyAmount(data.paid_payment_fee || 0);
      setDailyWeight(data.delivered_weight || 0);
      setDailyStay(data.received_weight || 0);

      if (data.paid_payment_fee) {
        setDailyAmount(data.paid_payment_fee);
      }
      if (data.delivered_weight) {
        setDailyWeight(data.delivered_weight);
      }
      if (data.received_weight) {
        setDailyStay(data.received_weight);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const adjustDate = (days: number) => {
    const newDateFrom = dayjs(dateFrom)
      .add(days, "day")
      .format("YYYY-MM-DD HH:mm:ss");
    const newDateTo = dayjs(dateTo)
      .add(days, "day")
      .format("YYYY-MM-DD HH:mm:ss");
    setDateFrom(newDateFrom);
    setDateTo(newDateTo);
  };

  return (
    <>
      <div className="space-y-2 mb-2">
        <div className="flex justify-center mb-3">
          <div>
            <h1 className="text-2xl font-semibold text-center">Sana</h1>
            <div className="flex gap-5 items-center">
              <div className="flex gap-5 items-center">
                <Button
                  className="bg-red-500 text-white p-2 rounded-full"
                  onClick={() => adjustDate(-1)}
                >
                  <GrLinkPrevious />
                </Button>
                <Typography className="text-base font-semibold">
                  {dayjs(dateFrom).format("YYYY-MM-DD")}
                </Typography>
              </div>
              <span className="bg-black w-[1px] h-5"></span>
              <div className="flex gap-5 items-center">
                <Typography className="text-base font-semibold">
                  {dayjs(dateTo).format("YYYY-MM-DD")}
                </Typography>
                <Button
                  className="bg-green-500 text-white p-2 rounded-full"
                  onClick={() => adjustDate(1)}
                >
                  <GrLinkNext />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 bg-white border-2 border-gray-100 rounded-xl p-2">
            <p className="text-base font-semibold border-e pe-1">Yetkazilgan</p>
            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {kgFormatter(dailyWeight)}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-gray-100 rounded-xl p-2">
            <p className="text-base font-semibold border-e pe-1">
              Qabul qilingan
            </p>
            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {kgFormatter(dailyStay)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 bg-white border-2 border-gray-100 rounded-xl p-2">
          <p className="text-xl font-semibold">To'langan to'lovlar</p>
          <p className="text-xl font-semibold">
            {priceFormatter(dailyAmount)}{" "}
            <span className="text-base font-semibold">so'm</span>
          </p>
        </div>
      </div>
    </>
  );
});
