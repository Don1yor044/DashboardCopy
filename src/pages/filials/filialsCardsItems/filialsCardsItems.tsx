import { Typography } from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { priceFormatter } from "../../../components/priceFormat/priceFormat";
import { MdOutlineDiscount } from "react-icons/md";
import { TbCashBanknote } from "react-icons/tb";
import { HiOutlineCreditCard } from "react-icons/hi";
import { IfilialsCardsData } from "../filialsCards/filialsCards";
import { BsBoxSeam } from "react-icons/bs";
import { kgFormatter } from "../../../components";

export const FilialsCardsItems = ({ item }: { item: IfilialsCardsData }) => {
  return (
    <>
      <div className="rounded-3xl border-2 border-gray-300 hover:border-red-500">
        <div className="bg-[#FE5222] p-3 md:p-5 rounded-t-2xl md:rounded-t-3xl">
          <Typography className="!text-white text-2xl md:text-4xl font-bold mb-3">
            {item.name || ""}
          </Typography>
          <div className="flex justify-between">
            <div className="space-y-1 md:space-y-2">
              <Typography className="text-base md:text-xl font-bold text-white">
                Qolgan summa
              </Typography>
              <Typography className="text-base md:text-xl font-bold text-white">
                To'langan to'lov
              </Typography>
            </div>
            <div className="flex flex-col items-end">
              <Typography className="text-lg md:text-3xl  font-bold text-white">
                {priceFormatter(item.payment_fee)}{" "}
                <span className="text-sm md:text-lg">so'm</span>
              </Typography>
              <Typography className="text-lg md:text-3xl font-bold text-white">
                {priceFormatter(item.paid_payment_fee)}{" "}
                <span className="text-sm md:text-lg">so'm</span>
              </Typography>
            </div>
          </div>
        </div>
        <div className="p-2 md:p-5 bg-white rounded-b-3xl">
          <div>
            <div className="flex border-b-2 justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <HiOutlineCreditCard size={22} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Karta orqali
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                {priceFormatter(item.paid_by_card)}{" "}
                <span className="text-lg md:text-xl text-[#797979]">so'm</span>
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
                <Typography className="text-base md:text-lg font-semibold">
                  Payme orqali
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                {priceFormatter(item.paid_by_payme)}{" "}
                <span className="text-lg md:text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <TbCashBanknote size={22} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Naqt orqali
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                {priceFormatter(item.paid_by_cash)}{" "}
                <span className="text-lg md:text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <MdOutlineDiscount size={22} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Chegirma orqali
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                {priceFormatter(item.discounted_fee)}{" "}
                <span className="text-lg md:text-xl text-[#797979]">so'm</span>
              </Typography>
            </div>{" "}
            <div className="flex border-b-2 justify-between py-2 md:mt-3">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <CiDeliveryTruck size={22} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Yetkazib berilgan Og'irligi
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                {kgFormatter(item.delivered_weight)}{" "}
              </Typography>
            </div>{" "}
            <div className="flex justify-between py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <BsBoxSeam size={20} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Qabul qilingan Og'irligi
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                {kgFormatter(item.received_weight)}{" "}
              </Typography>
            </div>
          </div>
          <div className="md:my-3">
            <div className="flex border-b-2 justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <CiDeliveryTruck size={25} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Yetkazib berilgan buyurtmalar
                </Typography>
              </div>
              <Typography className="text-2xl md:text-4xl font-bold text-black">
                <span className="text-[#FE5222]">
                  {item.delivered_item_counts || "0"}
                </span>{" "}
                ta
              </Typography>
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  <BsBoxSeam size={22} color="white" />
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Qabul qilingan buyurtmalar
                </Typography>
              </div>
              <Typography className="text-2xl md:text-4xl font-bold text-black">
                <span className="text-[#FE5222]">
                  {item.received_item_counts || "0"}
                </span>{" "}
                ta
              </Typography>
            </div>
          </div>
          <div className="md:my-3">
            <div className="flex border-b-2 justify-between items-center py-2">
              <div className="flex gap-3 items-center ">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  {/* <CiDeliveryTruck size={25} color="white" /> */}
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Sotuvchi orqali yetkazilgan
                </Typography>
              </div>
              <Typography className="text-2xl md:text-3xl font-bold text-black">
                <span className="text-[#FE5222]">
                  {isNaN(Number(item.weight_delivered_by_seller)) ? (
                    <div>
                      0 <span className="text-black">kg</span>
                    </div>
                  ) : (
                    kgFormatter(item.weight_delivered_by_seller)
                  )}{" "}
                </span>{" "}
              </Typography>
            </div>
            <div className="flex  justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                  {/* <BsBoxSeam size={22} color="white" /> */}
                </div>
                <Typography className="text-base md:text-lg font-semibold">
                  Sotuvchi orqali yetkazilgan
                </Typography>
              </div>
              <Typography className="text-2xl md:text-4xl font-bold text-black">
                <span className="text-[#FE5222]">
                  {item.count_delivered_by_seller || "0"}
                </span>{" "}
                ta
              </Typography>
            </div>
          </div>
          <div className="flex justify-between py-2">
            <div className="flex gap-3 items-center">
              <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                {/* <MdOutlineDiscount size={22} color="white" /> */}
              </div>
              <Typography className="text-base md:text-lg font-semibold">
                Punkdagi mavjud kg
              </Typography>
            </div>
            <Typography className="text-2xl md:text-4xl font-bold text-green-500">
              {isNaN(Number(item.left_weight))
                ? 0 + " kg"
                : kgFormatter(item.left_weight)}{" "}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
