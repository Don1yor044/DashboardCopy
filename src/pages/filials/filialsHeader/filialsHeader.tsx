import { DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

export const FilialsHeader = ({
  setDateFrom,
  setDateTo,
}: {
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}) => {
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));

  const handleFromDateChange = (date: any) => {
    const formattedDate = date ? date.format("YYYY-MM-DD HH:mm:ss") : "";
    setFromDate(date);
    setDateFrom(formattedDate);
  };

  const handleToDateChange = (date: any) => {
    const formattedDate = date ? date.format("YYYY-MM-DD HH:mm:ss") : "";
    setToDate(date);
    setDateTo(formattedDate);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-5 h-14">
        <div className="p-3 pe-10 flex gap-5 items-center border-e">
          <Typography className="text-2xl">Dan</Typography>
          <DatePicker
            // showTime // Vaqtni tanlash uchun
            value={fromDate} // Holatdan o'qiladi
            onChange={handleFromDateChange} // O'zgartirishni boshqaradi
            format="YYYY-MM-DD HH:mm:ss" // So'rov formati
            className="h-12 w-48 rounded-lg text-xl"
          />
        </div>
        <div className="p-3 flex gap-5 items-center">
          <Typography className="text-2xl">gacha</Typography>
          <DatePicker
            showTime // Vaqtni tanlash uchun
            value={toDate} // Holatdan o'qiladi
            onChange={handleToDateChange} // O'zgartirishni boshqaradi
            format="YYYY-MM-DD HH:mm:ss" // So'rov formati
            className="h-12 w-48 rounded-lg text-xl"
          />
        </div>
      </div>
    </div>
  );
};
