import { Button, Input, Segmented, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

export const DiscountedHeader = ({
  searchDiscounted,
  setSearchDiscounted,
  segmentValue,
  setSegmentValue,
}: {
  searchDiscounted: string;
  setSearchDiscounted: Dispatch<SetStateAction<string>>;
  segmentValue: string;
  setSegmentValue: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  const type = location.state?.type || "delivered";
  return (
    <div className="mt-4">
      <div className="bg-white flex gap-2 items-center rounded-full w-full mb-1 h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
        <LuSearch size={25} color="#FE5222" />
        <Input
          allowClear
          placeholder={`${
            type === "delivered"
              ? "Yetkazilgan tovar orqali qidiruv..."
              : "Chegirma qilingan tovar orqali qidiruv..."
          } `}
          value={searchDiscounted}
          onChange={(e) => setSearchDiscounted(e.target.value)}
          className="border-none text-xl"
          disabled
        />
      </div>
      <div className="mt-5 flex justify-between items-center">
        <Button
          onClick={() => navigate("/filials")}
          className="rounded-xl text-[#54571]"
        >
          <IoMdArrowRoundBack />
          Orqaga
        </Button>
        <div>
          <Typography className="font-semibold text-base md:text-lg">
            {location.state?.type === "delivered"
              ? "Yetkazilgan tovarlar"
              : location.state?.type === "discounted"
              ? "Chegirma orqali to'varlar"
              : location.state?.type === "card"
              ? "Karta orqali to'varlar"
              : location.state?.type === "cash"
              ? "Naqt pul orqali to'varlar"
              : location.state?.type === "payme"
              ? "Payme orqali to'varlar"
              : ""}
          </Typography>
        </div>
        <div>
          <Segmented
            value={segmentValue}
            className="p-2"
            onChange={(e) => setSegmentValue(e)}
            options={[
              {
                value: "list",
                icon: <HiMiniBars3 size={18} className="mt-1" />,
              },
              {
                value: "app",
                icon: <AiOutlineAppstore size={18} className="mt-1" />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
