import {
  Checkbox,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Typography,
} from "antd";
import baseURL from "../../../utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../components/toastManager";
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
  console.log(isSelected, "datalar");
  console.log(userId, "datalar");
  console.log(dataCourse, "datalar");
  console.log(searchId, "datalar");

  const [totalPaid, setTotalPaid] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radioValue, setRadioValue] = useState<number>(1);
  const [password, setPassword] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);

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
      weight: "",
    });
    setTotalPaid(0);
  }, [form]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const serviceId = localStorage.getItem("serviceId");

    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
    if (isSelected.length > 0) {
      const paidByCard: number = form.getFieldValue("kartaTolov");
      const paidByCash: number = form.getFieldValue("naqdTolov");
      const paidByPayme: number = form.getFieldValue("paymeTolov");
      const discountedFee: number = form.getFieldValue("chegirmaTolov");
      const weight: number = form.getFieldValue("weight");

      console.log(weight);

      if (isChange && password !== "17abu17") {
        return warningToast("Parol qaytadan kiring!");
      }

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
            status: radioValue,
            service_user_id: Number(serviceId),
            is_changed: isChange,
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
          setRadioValue(1);
          setIsChange(false);
          setPassword("");
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
    setRadioValue(1);
    setIsChange(false);
    setPassword("");
  };

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    console.log(e.target.value, "Radio number");
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
            value={radioValue}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "30px",
              width: "full",
            }}
            options={[
              {
                value: 2,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">
                      Mijoz o'zi olib ketti
                    </Typography>
                  </div>
                ),
              },
              {
                value: 3,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">
                      Pochtadan yuborildi
                    </Typography>
                  </div>
                ),
              },
              {
                value: 4,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">
                      Postomatga olib ketildi
                    </Typography>
                  </div>
                ),
              },
              {
                value: 5,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">
                      Kuryer olib ketdi
                    </Typography>
                  </div>
                ),
              },
              {
                value: 6,
                label: (
                  <div className="flex justify-between gap-5 ps-5 w-full items-center">
                    <Typography className="text-xl">
                      Yandexdan yuborildi
                    </Typography>
                  </div>
                ),
              },
              // {
              //   value: 7,
              //   label: (
              //     <div className="flex justify-between gap-5 ps-5 w-full items-center">
              //       <Typography className="text-xl">
              //         Sotuvchi tomonidan berildi
              //       </Typography>
              //     </div>
              //   ),
              // },
            ]}
          />
          {/* {radioValue === 7 && (
            <Form.Item className="mt-5" name={"password"}>
              <Input.Password
                name="password"
                visibilityToggle={true}
                placeholder="parol kiritng !"
                className="font-semibold text-base"
              />
            </Form.Item>
          )} */}
          {isChange ? (
            <div className="mt-3">
              <Input
                name="password"
                placeholder="parol kiritng !"
                className="font-semibold text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}
          <div className="mt-3 rounded-md p-2 bg-gray-200">
            <Checkbox
              checked={isChange}
              onChange={() => setIsChange(!isChange)}
              className="font-semibold"
            >
              <Typography className="text-lg ms-3">
                O'zgarishni tasdiqlash
              </Typography>
            </Checkbox>
            {/* <Button onClick={IsChange}>O'zgarishni tasdiqlash</Button> */}
          </div>
        </Modal>
      </Form>
    </>
  );
};
