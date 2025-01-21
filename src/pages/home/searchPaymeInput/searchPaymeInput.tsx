import { Form, Modal, Radio, RadioChangeEvent, Typography } from "antd";
import baseURL from "../../../utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../components/toastManager";
import { SearchPaymeInputItems } from "../searchPaymeInputItems/searchPaymeInputItems";
import { SearchPaymeInputProps } from "../../../types/types";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);

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

    setTotalPaid(total);
  };

  useEffect(() => {
    form.setFieldsValue({
      kartaTolov: "",
      naqdTolov: "",
      paymeTolov: "",
      chegirmaTolov: "",
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
            total_paid_by_cash: Number(paidByCash),
            total_paid_by_payme: Number(paidByPayme),
            total_discounted_fee: Number(discountedFee),
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleSubmit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
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
        <SearchPaymeInputItems
          handleSelectAll={handleSelectAll}
          totalPaid={totalPaid}
          residual={residual}
          showModal={showModal}
        />
        <Modal
          title={
            <div className="text-3xl font-semibold">Olib ketish usuli</div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Radio.Group
            onChange={onChange}
            value={value}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "30px",
              width: "full",
            }}
            options={[
              {
                value: 1,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">
                      Mijoz olib ketti
                    </Typography>
                  </div>
                ),
              },
              {
                value: 2,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">Pochata orqali</Typography>
                  </div>
                ),
              },
              {
                value: 3,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">Postamat orqali</Typography>
                  </div>
                ),
              },
              {
                value: 4,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">Curier orqali</Typography>
                  </div>
                ),
              },
              {
                value: 5,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">Yandex orqali</Typography>
                  </div>
                ),
              },
            ]}
          />
        </Modal>
      </Form>
    </>
  );
};
