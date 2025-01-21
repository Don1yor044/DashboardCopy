import { Button, Form, Input, Typography } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineDiscount } from "react-icons/md";
import baseURL from "../../../utils/api";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { errorToast, successToast } from "../../../components/toastManager";
import { IDashboards } from "../../../types/types";
import { priceFormatter } from "../../../components/priceFormat/priceFormat";

interface SearchPaymeInputProps {
  isSelected: number[];
  userId: number;
  fetchData: () => void;
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  dataCourse: IDashboards[];
  residual: number;
  searchId: string;
}

export const SearchPaymeInput: React.FC<SearchPaymeInputProps> = ({
  isSelected,
  userId,
  fetchData,
  setSelectedItems,
  dataCourse,
  residual,
  searchId,
}) => {
  const [totalPaid, setTotalPaid] = useState(0);
  const UserRole = localStorage.getItem("Role");

  const notifySuccess = () => successToast("Muvaffaqiyatli saqlandi !");
  const notifyError = () => errorToast("Xatolik qaytadan urinib ko'ring !");
  const notifyWarning = (data: string) =>
    toast.warning(`To'lanadigan summa miqdori: ${data} so'm `, {
      className: "text-lg w-[400px]",
    });

  const [form] = Form.useForm();

  const handleInputChange = () => {
    const paidByCard: number =
      parseFloat(form.getFieldValue("kartaTolov")) || 0;
    const paidByCash: number = parseFloat(form.getFieldValue("naqdTolov")) || 0;
    const paidByPayme: number =
      parseFloat(form.getFieldValue("paymeTolov")) || 0;
    const discountedFee: number =
      parseFloat(form.getFieldValue("chegirmaTolov")) || 0;

    console.log("Values:", {
      paidByCard,
      paidByCash,
      paidByPayme,
      discountedFee,
    });

    const total = paidByCard + paidByCash + paidByPayme + discountedFee;
    console.log("Total:", total);

    setTotalPaid(total);
  };

  useEffect(() => {
    form.setFieldsValue({
      kartaTolov: 0,
      naqdTolov: 0,
      paymeTolov: 0,
      chegirmaTolov: 0,
    });
    setTotalPaid(0);
  }, [form]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
    if (isSelected.length > 0) {
      const paidByCard: number = form.getFieldValue("kartaTolov");
      const paidByCash: number = form.getFieldValue("naqdTolov");
      const paidByPayme: number = form.getFieldValue("paymeTolov");
      const discountedFee: number = form.getFieldValue("chegirmaTolov");

      try {
        const idToUse = userId === 0 ? searchId : userId;
        const response = await baseURL.put(
          `/api/client/dashboard/all/${idToUse}`,
          {
            total_paid_by_card: Number(paidByCard),
            total_paid_by_cash: paidByCash,
            total_paid_by_payme: paidByPayme,
            total_discounted_fee: discountedFee,
            total_dashboard_ids: isSelected,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.msg === -1) {
          notifyError();
        } else if (response.data.msg === "SUCCESS") {
          notifySuccess();
          form.resetFields();
          setSelectedItems([]);
          setTimeout(() => {
            fetchData();
          }, 1000);
        } else {
          notifyWarning(response.data.data);
        }
        console.log("Data submitted:", response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleSelectAll = () => {
    const allIds = dataCourse.map((item) => item.id);

    if (allIds.every((id) => isSelected.includes(id))) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => !allIds.includes(id))
      );
    } else {
      setSelectedItems((prevSelected) => {
        const newSelection = [...new Set([...prevSelected, ...allIds])];
        return newSelection;
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        className="bg-white rounded-xl p-3 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]"
        layout="inline"
        onFinish={handleSubmit}
        onValuesChange={handleInputChange}
      >
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
          <div className="flex gap-3">
            <Button
              onClick={handleSelectAll}
              className="text-sm bg-green-500 p-4 text-white"
            >
              All
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="text-sm p-2"
              disabled={UserRole === "30" && true}
            >
              Olib kettish
            </Button>{" "}
          </div>
        </div>
      </Form>
    </>
  );
};
