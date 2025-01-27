import { DatePicker, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export const FilialsHeader = ({
  setDateFrom,
  setDateTo,
}: {
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(
    dayjs().startOf("day")
  );
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs().endOf("day"));

  const handleFromDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format("YYYY-MM-DD HH:mm:ss") : "";
    setFromDate(date);
    setDateFrom(formattedDate);
  };

  const handleToDateChange = (date: Dayjs | null) => {
    if (date) {
      const updatedDate = date.add(3, "hour");
      const formattedDate = updatedDate.format("YYYY-MM-DD HH:mm:ss");
      setToDate(updatedDate);
      setDateTo(formattedDate);
    } else {
      setToDate(null);
      setDateTo("");
    }
  };

  return (
    <div className="flex justify-between items-center mt-10">
      <div className="flex gap-5 h-14">
        <div className="p-3 pe-10 flex gap-5 items-center border-e">
          <Typography className="text-2xl">Dan</Typography>
          <DatePicker
            value={fromDate}
            onChange={handleFromDateChange}
            format="YYYY-MM-DD HH:mm:ss"
            className="h-12 w-48 rounded-lg text-xl"
          />
        </div>
        <div className="p-3 flex gap-5 items-center">
          <Typography className="text-2xl">gacha</Typography>
          <DatePicker
            value={toDate}
            onChange={handleToDateChange}
            format="YYYY-MM-DD HH:mm:ss"
            className="h-12 w-48 rounded-lg text-xl"
          />
        </div>
      </div>
    </div>
  );
};
