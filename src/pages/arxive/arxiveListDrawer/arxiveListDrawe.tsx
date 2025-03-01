import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import { IDashboards } from "../../../types/types";
import baseURL from "../../../utils/api";
import { priceFormatter, SendButton } from "../../../components";
import {
  successToast,
  errorToast,
  warningToast,
} from "../../../components/toastManager";

export const ArxiveListDrawe = ({
  open,
  onClose,
  selectedUser,
  fetchData,
}: {
  open: boolean;
  onClose: () => void;
  selectedUser?: IDashboards | null;
  fetchData: () => void;
}) => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);

  const notifySuccess = () => successToast("Muvaffaqiyatli saqlandi !");
  const notifyError = () => errorToast("Xatolik qaytadan urinib ko'ring !");
  const notifyWarning = (data: string) =>
    toast.warning(`To'lanadigan summa miqdori: ${data} so'm `, {
      className: "text-lg w-[400px]",
    });

  useEffect(() => {
    if (!form || !selectedUser) return;

    form.setFieldsValue({
      weight: selectedUser.weight,
      status: selectedUser.status,
      paid_by_card: selectedUser.paid_by_card,
      paid_by_cash: selectedUser.paid_by_cash,
      paid_by_payme: selectedUser.paid_by_payme,
      discounted_fee: selectedUser.discounted_fee,
      comment: selectedUser.comment,
    });
  }, [selectedUser, form]);

  const Onfinish = async (values: {
    paid_by_card: number;
    paid_by_cash: number;
    paid_by_payme: number;
    discounted_fee: number;
    status: number;
    weight: number;
    comment: string;
  }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
    try {
      const serviceId = localStorage.getItem("serviceId");
      const {
        paid_by_card,
        paid_by_cash,
        paid_by_payme,
        discounted_fee,
        status,
        weight,
        comment,
      } = values;

      if (!paid_by_card && !paid_by_cash && !paid_by_payme && !discounted_fee) {
        warningToast("Kamida bitta to'lov summasini kiriting!");
        return;
      }
      if (status == 1) {
        warningToast("Olib ketishni usulini tanglang!");
        return;
      }
      if (isChange && password !== "17abu17") {
        warningToast("Parol qaytadan kiring!");
        return;
      }
      try {
        const response = await baseURL.put(
          `/api/client/dashboard/${selectedUser?.id}`,
          {
            paid_by_card: Number(paid_by_card),
            paid_by_cash: Number(paid_by_cash),
            paid_by_payme: Number(paid_by_payme),
            discounted_fee: Number(discounted_fee),
            status: status,
            service_user_id: Number(serviceId),
            is_changed: isChange,
            weight: Number(weight),
            comment: comment,
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
          setIsChange(false);
          setPassword("");
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      title={<div className="text-2xl">Tahrirlash</div>}
      onClose={onClose}
      open={open}
      width={500}
      className="text-xl"
    >
      <div className="text-center bg-gray-100 rounded-md p-2 space-y-1">
        <div className="flex justify-between items-center">
          <Typography className="text-lg font-semibold">
            {selectedUser?.full_name}
          </Typography>
          <Typography className="mt-2 font-semibold">
            userId : {selectedUser?.user_id}
          </Typography>{" "}
        </div>
        <div className="flex justify-between items-center">
          <Typography className="text-lg font-semibold">
            Track Number
          </Typography>
          <Typography className="mt-2 font-semibold">
            {selectedUser?.express_num}
          </Typography>{" "}
        </div>
        <div className="flex justify-between items-center ">
          <Typography className="text-lg font-semibold">
            Kargo to’lovlar
          </Typography>
          <Typography className="mt-2 text-lg font-semibold">
            {priceFormatter(Number(selectedUser?.payment_fee))}{" "}
            <span className="text-gray-500">so'm</span>
          </Typography>{" "}
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        className="mt-10"
        onFinish={Onfinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="weight"
              label="Weight (gr)"

              // rules={[
              //   { required: true, message: "Iltimos og'irligini kiritng !" },
              // ]}
            >
              <Input placeholder="og'irligi" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please enter Status" }]}
            >
              <Select>
                <Select.Option value={1} disabled>
                  Punkda
                </Select.Option>
                <Select.Option value={2}>Mijoz o'zi olib ketti</Select.Option>
                <Select.Option value={3}>Pochtadan yuborildi</Select.Option>
                <Select.Option value={4}>Postomatga olib ketildi</Select.Option>
                <Select.Option value={5}>Kuryer olib ketdi</Select.Option>
                <Select.Option value={6}>Yandexdan yuborildi</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="paid_by_card" label="Karta orqali">
              <Input type="number" placeholder="Iltimos summani kiritng !" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="paid_by_cash" label="Naqt orqali">
              <Input type="number" placeholder="Iltimos summani kiritng !" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="paid_by_payme" label="Payme orqali">
              <Input type="number" placeholder="Iltimos summani kiritng !" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="discounted_fee" label="Chegirma orqali">
              <Input type="number" placeholder="Iltimos summani kiritng !" />
            </Form.Item>
          </Col>{" "}
          <Col span={24}>
            <Form.Item name="comment" label="Izoh yozish">
              <TextArea
                placeholder="Iltimos izoh yozing !"
                className="!max-h-28 !min-h-28 text-md font-semibold"
              />
            </Form.Item>
          </Col>
        </Row>
        {isChange ? (
          <div className="mb-2">
            <Input
              name="password"
              placeholder="parol kiritng !"
              className="font-semibold text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        <div className="rounded-md p-2 bg-gray-100 mb-5">
          <Checkbox
            checked={isChange}
            onChange={() => setIsChange(!isChange)}
            className="font-semibold"
          >
            <Typography className="text-lg ms-3">
              O'zgarishni tasdiqlash
            </Typography>
          </Checkbox>
        </div>
        {/* <Button
          type="primary"
          htmlType="submit"
          className="bg-[#FE5222] font-bold p-4 hover:!bg-[#ff6c43]"
        >
          Olib ketish
        </Button> */}
        <Button type="text" htmlType="submit" className="!p-0">
          <SendButton text="O'zgartirish" />
        </Button>
      </Form>
    </Drawer>
  );
};
