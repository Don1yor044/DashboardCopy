import { Button, Select, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { FilterHeaderDestop } from "./filterHeaderDesktop/filterHeaderDestop";
import { FilterHeaderMobile } from "./filterHeaderMobile/filterHeaderMobile";
interface MenuItem {
  key: string;
  label: React.ReactNode;
}

type MenuItems = MenuItem[];

export const FiltersHeader = ({
  handleCountSort,
  handlePaymeSort,
  handleDateAsc,
  handleDateDesc,
  handleRegionChange,
  region,
  activeButton,
  setDateFrom,
  setDateTo,
  handleDateRangeFilter,
  dateFrom,
  dateTo,
  handleUser,
}: {
  handleCountSort: () => void;
  handlePaymeSort: () => void;
  handleDateAsc: () => void;
  handleDateDesc: () => void;
  handleRegionChange: (value: string) => void;
  region: string;
  activeButton: string;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
  handleDateRangeFilter: () => void;
  dateFrom: string;
  dateTo: string;
  handleUser: () => void;
}) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(
    dateFrom ? dayjs(dateFrom, "YYYY-MM-DD HH:mm:ss") : null
  );
  const [toDate, setToDate] = useState<Dayjs | null>(
    dateTo ? dayjs(dateTo, "YYYY-MM-DD HH:mm:ss") : null
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (activeButton !== "dateRage") {
      setDateFrom("");
      setDateTo("");
      setFromDate(null);
      setToDate(null);
    }
  }, [activeButton, setDateFrom, setDateTo]);

  const handleFromDateChange = (date: Dayjs | null) => {
    setFromDate(date);
    setDateFrom(date ? date.format("YYYY-MM-DD HH:mm:ss") : "");
  };

  const handleToDateChange = (date: Dayjs | null) => {
    setToDate(date);
    setDateTo(date ? date.format("YYYY-MM-DD HH:mm:ss") : "");
  };

  const menuItems: MenuItems = [
    {
      key: "1",
      label: (
        <>
          <Typography.Text className="font-semibold text-lg">
            Viloyat bo'yicha
          </Typography.Text>
          <Select
            value={region}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(value) => {
              handleRegionChange(value);
              setOpen(false);
            }}
            placeholder="Viloyat tanlang"
            className="w-full mt-2"
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
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <Typography className="!text-lg font-semibold">
            Vaqt bo'yicha
          </Typography>
          <div className="flex justify-center gap-4 mt-2">
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
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <Typography className="!text-lg mb-2 font-semibold">
            Telefon qilish
          </Typography>
          <Button
            className={activeButton === "user" ? "bg-green-500 text-white" : ""}
            onClick={handleUser}
          >
            Telefon qilish
          </Button>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <Typography className="!text-lg mb-2 font-semibold">
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
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
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
        </>
      ),
    },
  ];

  return (
    <>
      <FilterHeaderDestop
        region={region}
        handleRegionChange={handleRegionChange}
        fromDate={fromDate}
        handleFromDateChange={handleFromDateChange}
        toDate={toDate}
        handleToDateChange={handleToDateChange}
        handleDateRangeFilter={handleDateRangeFilter}
        activeButton={activeButton}
        handleDateDesc={handleDateDesc}
        handleDateAsc={handleDateAsc}
        handleUser={handleUser}
        handlePaymeSort={handlePaymeSort}
        handleCountSort={handleCountSort}
      />
      <FilterHeaderMobile
        open={open}
        setOpen={setOpen}
        menuItems={menuItems}
        fromDate={fromDate}
        handleFromDateChange={handleFromDateChange}
        toDate={toDate}
        handleToDateChange={handleToDateChange}
        handleDateRangeFilter={handleDateRangeFilter}
      />
    </>
  );
};
