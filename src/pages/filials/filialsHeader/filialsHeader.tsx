import { Col, DatePicker, Row, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const FilialsHeader = ({
  setDateFrom,
  setDateTo,
}: {
  setDateFrom: Dispatch<SetStateAction<Dayjs | null>>;
  setDateTo: Dispatch<SetStateAction<Dayjs | null>>;
}) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(
    dayjs().startOf("day")
  );
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs().endOf("day"));
  const [showTime, setShowTime] = useState<boolean>(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowTime(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFromDateChange = (date: Dayjs | null) => {
    if (date) {
      setFromDate(date);
      setDateFrom(date);
    } else {
      setFromDate(null);
      setDateFrom(null);
    }
  };

  const handleToDateChange = (date: Dayjs | null) => {
    const originalDate = date ? date : toDate;
    if (originalDate) {
      setToDate(originalDate);
      setDateTo(originalDate);
    } else {
      setToDate(null);
      setDateTo(null);
    }
  };

  return (
    <div className="flex justify-between items-center md:mt-10">
      <Row className="h-14 w-full">
        <Col xl={6} span={12} className="p-3 md:flex gap-1 items-center ">
          <DatePicker
            value={fromDate}
            onChange={handleFromDateChange}
            format={showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
            showTime={showTime}
            className="h-12 w-48 pe-2 rounded-lg text-xl font-semibold md:mt-0 mt-2"
          />
          <Typography className="text-2xl">dan</Typography>
        </Col>
        <Col xl={6} span={12} className="p-3 md:flex gap-1 items-center">
          <DatePicker
            value={toDate}
            onChange={handleToDateChange}
            format={showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
            showTime={showTime}
            className="h-12 w-48 rounded-lg pe-2 text-xl font-semibold md:mt-0 mt-2"
          />
          <Typography className="text-2xl">gacha</Typography>
        </Col>
      </Row>
    </div>
  );
};
