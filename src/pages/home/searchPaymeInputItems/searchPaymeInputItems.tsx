import { Button, Form, Input, Typography } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineDiscount } from "react-icons/md";
import { priceFormatter } from "../../../components/priceFormat/priceFormat";
import { SendButton } from "../../../components";

export const SearchPaymeInputItems = ({
  handleSelectAll,
  totalPaid,
  residual,
  showModal,
}: {
  handleSelectAll: () => void;
  totalPaid: number;
  residual: number;
  showModal: () => void;
}) => {
  const UserRole = localStorage.getItem("Role");

  return (
    <>
      <div className="flex gap-1 items-center justify-around w-full">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 p-1 rounded-lg">
            <HiOutlineCreditCard size={25} />
          </div>
          <Form.Item name="kartaTolov" className="m-0">
            <Input
              placeholder="Karta to'lovni kiriting"
              className="h-12 text-base"
              type="number"
            />
          </Form.Item>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 p-1 rounded-lg">
            <BsCurrencyDollar size={24} />
          </div>
          <Form.Item name="naqdTolov" className="m-0">
            <Input
              placeholder="Naqd to'lovni kiriting"
              className="h-12 text-base"
              type="number"
            />
          </Form.Item>
        </div>
        <div className="flex gap-2 items-center ">
          <div className="bg-gray-200 p-1 rounded-lg">
            <img src="./PaymeIconSvg.svg" className="h-7 w-8" alt="payme" />
          </div>
          <Form.Item name="paymeTolov" className="m-0">
            <Input
              placeholder="Payme to'lovni kiriting"
              className="h-12 text-base"
              type="number"
            />
          </Form.Item>
        </div>
        <div className="flex gap-2 items-center ">
          <div className="bg-gray-200 p-2 rounded-lg">
            <MdOutlineDiscount size={20} />
          </div>
          <Form.Item name="chegirmaTolov" className="m-0">
            <Input
              placeholder="Chegirma to'lovni kiriting"
              className="h-12 text-base"
              type="number"
            />
          </Form.Item>
        </div>

        <div className="flex gap-2 border border-red-500 p-3 rounded-lg items-center">
          <div className="border-e px-2">
            <Typography className="text-lg font-semibold">
              Qolgan summa
            </Typography>
          </div>
          <div>
            <Typography className="text-lg">
              {priceFormatter(residual - totalPaid || 0)}
            </Typography>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleSelectAll}
            className="text-base font-semibold bg-green-500 p-4  text-white !rounded-xl"
          >
            All
          </Button>
          <Button
            type="text"
            className="!p-0"
            onClick={showModal}
            disabled={UserRole === "30" && true}
          >
            <SendButton text="Olib ketish" />
          </Button>
        </div>
      </div>
    </>
  );
};
