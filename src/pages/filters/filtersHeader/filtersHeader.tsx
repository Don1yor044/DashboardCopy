import { Button, DatePicker, Dropdown, Select, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";

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
    dateFrom ? dayjs(dateFrom) : null
  );
  const [toDate, setToDate] = useState<Dayjs | null>(
    dateTo ? dayjs(dateTo).subtract(1, "day") : null
  );
  const [open, setOpen] = useState(false);

  const handleFromDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format("YYYY-MM-DD HH:mm:ss") : "";
    setFromDate(date);
    setDateFrom(formattedDate);
  };

  const handleToDateChange = (date: Dayjs | null) => {
    if (date) {
      const updatedDate = date.add(1, "day").add(3, "hour");
      const displayDate = date;
      const formattedDate = updatedDate.format("YYYY-MM-DD HH:mm:ss");
      setToDate(displayDate);
      setDateTo(formattedDate);
    } else {
      setToDate(null);
      setDateTo("");
    }
  };
  const menuItems = [
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
      <div className="hidden md:flex gap-3 bg-white-100 px-4 py-3 rounded-2xl justify-between shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
        <div className="px-5">
          <Typography className=" !text-lg font-semibold">
            Viloyat bo'yicha
          </Typography>
          <Select
            defaultValue="Region"
            value={region}
            className="mt-2 min-w-[130px]"
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
          <div className="flex justify-center mb-2">
            <Typography className="!text-lg font-semibold">
              Vaqt bo'yicha{" "}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <DatePicker
                value={fromDate}
                onChange={handleFromDateChange}
                format="YYYY-MM-DD"
                placeholder="Boshlanish"
                className="h-10 w-32 rounded-lg text-xl"
              />
            </div>
            <div>
              <DatePicker
                value={toDate}
                onChange={handleToDateChange}
                format="YYYY-MM-DD"
                placeholder="Tugash "
                className="h-10 w-32 rounded-lg text-xl"
              />
            </div>
            <div>
              <Button
                type="primary"
                className="p-2"
                onClick={handleDateRangeFilter}
              >
                Qidirish
              </Button>
            </div>
          </div>
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
            Telefon qilish
          </Typography>
          <Button
            className={activeButton === "user" ? "bg-green-500 text-white" : ""}
            onClick={handleUser}
          >
            Telefon qilish
          </Button>
        </div>{" "}
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
      <div className="md:hidden block px-2 pt-4">
        <div>
          <div className="flex justify-center mb-2">
            <Typography className="!text-lg font-semibold">
              Vaqt bo'yicha{" "}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <DatePicker
                value={fromDate}
                onChange={handleFromDateChange}
                format="YYYY-MM-DD"
                placeholder="Boshlanish"
                className="h-10 rounded-lg text-xl"
              />
            </div>
            <div>
              <DatePicker
                value={toDate}
                onChange={handleToDateChange}
                format="YYYY-MM-DD"
                placeholder="Tugash"
                className="h-10  rounded-lg text-xl"
              />
            </div>

            <div>
              <Button
                type="primary"
                className="p-2"
                onClick={handleDateRangeFilter}
              >
                Qidirish
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <Dropdown
              open={open}
              onOpenChange={setOpen}
              trigger={["click"]}
              // getPopupContainer={(trigger) =>
              //   trigger.parentElement || document.body
              // }

              menu={{
                items: menuItems,
                className:
                  "bg-white shadow-lg rounded-lg p-4 w-52 text-center ",
              }}
            >
              <div className="flex justify-end">
                <Button
                  className="mt-2 rounded-full w-10 h-10 p-0 border-2 border-gray-300"
                  onClick={() => setOpen(!open)}
                >
                  <BiFilterAlt size={20} className="text-gray-700" />
                </Button>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};
