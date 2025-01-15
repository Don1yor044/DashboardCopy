import { DatePicker, Typography } from "antd";
import dayjs from "dayjs";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

export const FilialsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[350px] bg-[#FE5222] rounded-3xl p-5">
        <Typography className="text-2xl font-bold">Jami</Typography>
        <Typography className="text-3xl font-bold text-white mt-2 ">
          566 595 999 <span className="text-2xl font-normal">so'm</span>
        </Typography>
      </div>

      <div className="flex gap-5 h-14">
        <div className="p-3 pe-10 flex gap-5 items-center border-e">
          <Typography className="text-2xl">from</Typography>
          <DatePicker
            defaultValue={dayjs("01/12/2024", dateFormatList[0])}
            format={dateFormatList}
            className="h-12 w-48 rounded-lg text-xl"
          />
        </div>
        <div className="p-3 flex gap-5 items-center">
          <Typography className="text-2xl">to</Typography>
          <DatePicker
            defaultValue={dayjs("01/12/2024", dateFormatList[0])}
            format={dateFormatList}
            className="h-12 w-48 rounded-lg text-xl"
          />
        </div>
      </div>
    </div>
  );
};
