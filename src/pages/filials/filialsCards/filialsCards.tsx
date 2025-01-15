import { Button, Typography } from "antd";
import { BsBoxSeam, BsCheckLg } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TbCashBanknote } from "react-icons/tb";
const lenght = [1, 2, 3, 4, 5];
export const FilialsCards = () => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {lenght.map((item) => (
        <div
          className="rounded-3xl border-2 border-gray-300 hover:border-red-500"
          key={item}
        >
          <div className="bg-[#FE5222] p-5 rounded-t-3xl">
            <Typography.Title level={2} className="!text-white">
              Shota Rustaveli
            </Typography.Title>
            <div className="flex justify-between">
              <div className="space-y-3">
                <Typography className="text-xl font-bold">
                  Payment Fee
                </Typography>
                <Typography className="text-xl font-bold">
                  Paid Payment Fee
                </Typography>
              </div>
              <div className="flex flex-col items-end ">
                <Typography className="text-3xl font-bold text-white">
                  5 635 555 <span className="text-lg">so'm</span>
                </Typography>
                <Typography className="text-3xl font-bold text-white">
                  721 226 <span className="text-lg">so'm</span>
                </Typography>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-b-3xl">
            <div>
              <div className="flex border-b-2 justify-between items-center py-2">
                <div className="flex gap-3 items-center ">
                  <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                    <HiOutlineCreditCard size={22} color="white" />
                  </div>{" "}
                  <Typography className="text-lg font-semibold ">
                    Karta orqali
                  </Typography>
                </div>
                <Typography className="text-3xl font-bold text-black">
                  221 350 <span className="text-xl text-[#797979]">so'm</span>
                </Typography>
              </div>{" "}
              <div className="flex border-b-2 justify-between py-2">
                <div className="flex gap-3 items-center ">
                  <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                    <img
                      src="./PaymeIconSvg.svg"
                      alt="payme"
                      className="w-[85%]"
                    />
                  </div>{" "}
                  <Typography className="text-lg font-semibold ">
                    Payme orqali
                  </Typography>
                </div>
                <Typography className="text-3xl font-bold text-black">
                  444 000 <span className="text-xl text-[#797979]">so'm</span>
                </Typography>
              </div>{" "}
              <div className="flex justify-between py-2">
                <div className="flex gap-3 items-center ">
                  <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                    <TbCashBanknote size={22} color="white" />
                  </div>{" "}
                  <Typography className="text-lg font-semibold ">
                    Naqt orqali
                  </Typography>
                </div>
                <Typography className="text-3xl font-bold text-black">
                  330 055 <span className="text-xl text-[#797979]">so'm</span>
                </Typography>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between items-center py-1">
                <div className="flex gap-3 items-center ">
                  <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                    <CiDeliveryTruck size={25} color="white" />
                  </div>{" "}
                  <Typography className="text-lg font-semibold ">
                    Deliveryed orders
                  </Typography>
                </div>
                <Typography className="text-5xl font-bold text-black">
                  <span className="text-[#FE5222]">210</span> ta
                </Typography>
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex gap-3 items-center ">
                  <div className="bg-[#FE5222] h-9 w-9 rounded-full flex justify-center items-center">
                    <BsBoxSeam size={22} color="white" />
                  </div>{" "}
                  <Typography className="text-lg font-semibold ">
                    Received orders
                  </Typography>
                </div>
                <Typography className="text-5xl font-bold text-black">
                  <span className="text-[#FE5222]">310</span> ta
                </Typography>
              </div>
              <div className="flex justify-end mt-7">
                <Button type="default" className="w-9 h-9 p-0">
                  <BsCheckLg size={25} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
