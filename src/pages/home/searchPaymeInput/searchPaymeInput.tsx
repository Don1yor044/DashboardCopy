import { Button, Form, Input } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineDiscount } from "react-icons/md";
import baseURL from "../../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

interface SearchPaymeInputProps {
  isSelected: number[];
  userId: number; // userId must always be a number
  fetchData: () => void;
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
}

export const SearchPaymeInput: React.FC<SearchPaymeInputProps> = ({
  isSelected,
  userId,
  fetchData,
  setSelectedItems,
}) => {
  const notifySuccess = () =>
    toast.success("Muvaffaqiyatli saqlandi !", {
      className: "text-xl",
    });
  const notifyError = () =>
    toast.error("Xatolik qaytadan urinib ko'ring !", {
      className: "text-lg",
    });
  const notifyWarning = (data: string) =>
    toast.warning(`To'lanadigan summa miqdori: ${data} so'm `, {
      className: "text-lg w-[400px]",
    });
  const notifyAlreadyPaid = () =>
    toast.info("Bu tovar allaqachon to'langan!", {
      className: "text-2xl p-3 w-[500px] flex justify-center h-32",
    });

  const [form] = Form.useForm();

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
        const response = await baseURL.put(
          `/api/client/dashboard/all/${userId}`,
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
              "ngrok-skip-browser-warning": "true",
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
        } else if (response.data.msg == "NO ORDERS FOUND") {
          notifyAlreadyPaid();
        } else {
          notifyWarning(response.data.data);
        }
        console.log("Data submitted:", response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <>
      <Form
        form={form}
        className="bg-white rounded-xl p-3 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]"
        layout="inline"
        onFinish={handleSubmit} // Trigger handleSubmit when form is submitted
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

          <div className="flex gap-2 items-center">
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

          <div className="flex gap-2 items-center">
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

          <Button type="primary" htmlType="submit" className="text-sm p-2">
            Saqlash
          </Button>
        </div>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
