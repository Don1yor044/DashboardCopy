import { Button, DatePicker, Dropdown, Typography } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { Dayjs } from "dayjs";
import { BiFilterAlt } from "react-icons/bi";

export const FilterHeaderMobile = ({
  open,
  setOpen,
  menuItems,
  fromDate,
  handleFromDateChange,
  toDate,
  handleToDateChange,
  handleDateRangeFilter,
}: {
  setOpen: (value: boolean) => void;
  open: boolean;
  menuItems: ItemType[];
  fromDate: Dayjs | null;
  handleFromDateChange: (date: Dayjs | null) => void;
  toDate: Dayjs | null;
  handleToDateChange: (date: Dayjs | null) => void;
  handleDateRangeFilter: () => void;
}) => {
  return (
    <>
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
