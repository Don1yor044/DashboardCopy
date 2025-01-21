import { Typography } from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { priceFormatter } from "../../../components/priceFormat/priceFormat";
import { MdOutlineDiscount } from "react-icons/md";
import { TbCashBanknote } from "react-icons/tb";
import { HiOutlineCreditCard } from "react-icons/hi";
import { IfilialsCardsData } from "../filialsCards/filialsCards";
import { BsBoxSeam } from "react-icons/bs";

export const FilialsCardsItems = ({ item }: { item: IfilialsCardsData }) => {
  return (
    <>
      <div className="rounded-3xl border-2 border-gray-300 hover:border-red-500">
        <div className="bg-[#FE5222] p-5 rounded-t-3xl">
          <Typography.Title level={2} className="!text-white">
            {item.name || ""}
          </Typography.Title>
          <div className="flex justify-between">
            <div className="space-y-3">
              <Typography className="text-xl font-bold text-white">
                Qolgan summa
              </Typography>
              <Typography className="text-xl font-bold text-white">
                To'langan to'lov
              </Typography>
            </div>
            <div className="flex flex-col items-end">
              <Typography className="text-3xl font-bold text-white">
                {priceFormatter(item.payment_fee)}{" "}
                <span className="text-lg">so'm</span>
              </Typography>
              <Typography className="text-3xl font-bold text-white">
                {priceFormatter(item.paid_payment_fee)}{" "}
                <span className="text-lg">so'm</span>
              </Typography>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-b-3xl">
          <div>
            <div className="flex border-b-2 justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <HiOutlineCreditCard size={22} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Karta orqali
                </Typography>
              </div>
              <Typography className="text-3xl font-bold text-black">
                {priceFormatter(item.paid_by_card)}{" "}
                <span className="text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <img
                    src="./PaymeIconSvg.svg"
                    alt="payme"
                    className="w-[85%]"
                  />
                </div>
                <Typography className="text-lg font-semibold">
                  Payme orqali
                </Typography>
              </div>
              <Typography className="text-3xl font-bold text-black">
                {priceFormatter(item.paid_by_payme)}{" "}
                <span className="text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <TbCashBanknote size={22} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Naqt orqali
                </Typography>
              </div>
              <Typography className="text-3xl font-bold text-black">
                {priceFormatter(item.paid_by_cash)}{" "}
                <span className="text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <MdOutlineDiscount size={22} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Chegirma orqali
                </Typography>
              </div>
              <Typography className="text-3xl font-bold text-black">
                {priceFormatter(item.discounted_fee)}{" "}
                <span className="text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>{" "}
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <CiDeliveryTruck size={22} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Yetkazib berilgan Og'irligi
                </Typography>
              </div>
              <Typography className="text-3xl font-bold text-black">
                {priceFormatter(item.delivered_weight)}{" "}
                <span className="text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>{" "}
            <div className="flex  justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <BsBoxSeam size={20} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Qabul qilingan Og'irligi
                </Typography>
              </div>
              <Typography className="text-3xl font-bold text-black">
                {priceFormatter(item.received_weight)}{" "}
                <span className="text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between items-center py-1">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <CiDeliveryTruck size={25} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Yetkazib berilgan buyurtmalar
                </Typography>
              </div>
              <Typography className="text-4xl font-bold text-black">
                <span className="text-[#FE5222]">
                  {item.delivered_item_counts || "0"}
                </span>{" "}
                ta
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <BsBoxSeam size={22} color="white" />
                </div>
                <Typography className="text-lg font-semibold">
                  Qabul qilingan buyurtmalar
                </Typography>
              </div>
              <Typography className="text-4xl font-bold text-black">
                <span className="text-[#FE5222]">
                  {item.received_item_counts || "0"}
                </span>{" "}
                ta
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
