import { Button, Select, Typography } from "antd";

export const FiltersHeader = ({
  handleCountSort,
  handlePaymeSort,
  handleDateAsc,
  handleDateDesc,
  handleRegionChange,
  region,
  activeButton,
}: {
  handleCountSort: () => void;
  handlePaymeSort: () => void;
  handleDateAsc: () => void;
  handleDateDesc: () => void;
  handleRegionChange: (value: string) => void;
  region: string;
  activeButton: string;
}) => {
  return (
    <>
      <div className="flex gap-3 mt-10 bg-white-100 px-4 py-3 rounded-2xl justify-between shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
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
    </>
  );
};
