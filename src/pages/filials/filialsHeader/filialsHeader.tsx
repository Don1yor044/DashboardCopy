import { Col, DatePicker, Row, Typography } from "antd";
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
    <div className="flex justify-between items-center mt-24 md:mt-10">
      <Row className="h-14 w-full">
        <Col xl={4} span={12} className="p-3 md:flex gap-5 items-center ">
          <Typography className="text-2xl">Dan</Typography>
          <DatePicker
            value={fromDate}
            onChange={handleFromDateChange}
            format="YYYY-MM-DD"
            className="h-12 w-36 rounded-lg text-xl font-semibold md:mt-0 mt-2"
          />
        </Col>
        <Col xl={4} span={12} className="p-3 md:flex gap-5 items-center">
          <Typography className="text-2xl">gacha</Typography>
          <DatePicker
            value={toDate}
            onChange={handleToDateChange}
            format="YYYY-MM-DD "
            className="h-12 w-36 rounded-lg text-xl font-semibold md:mt-0 mt-2"
          />
        </Col>
      </Row>
    </div>
  );
};
