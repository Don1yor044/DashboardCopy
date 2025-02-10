import React, { Dispatch, SetStateAction } from "react";
import { Modal, Form, Input, Button, Typography, Radio, Checkbox } from "antd";
import { IDashboards } from "../../../types/types";
import { ModalType } from "../card";

const { TextArea } = Input;

interface PaymentModalProps {
  item: IDashboards;
  modalOpen: { [key: number]: { type: ModalType; open: boolean } };
  closeModal: (id: number) => void;
  handleLocalSave: (id: number, values: Partial<IDashboards>) => void;
  setIsChange: (e: boolean) => void;
  isChange: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const PaymentModals: React.FC<PaymentModalProps> = ({
  item,
  modalOpen,
  closeModal,
  handleLocalSave,
  isChange,
  setIsChange,
  setPassword,
  password,
}) => {
  const modalsConfig = [
    {
      type: "status",
      title: "Olib ketish usuli",
      fieldName: "status",
      isRadio: true,
      options: [
        {
          value: 2,
          label: (
            <div className="flex justify-between gap-5 ps-5 w-full items-center">
              <Typography className="text-xl">Mijoz o'zi olib ketti</Typography>
            </div>
          ),
        },
        {
          value: 3,
          label: (
            <div className="flex justify-between gap-5 ps-5 w-full items-center">
              <Typography className="text-xl">Pochtadan yuborildi</Typography>
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
              <Typography className="text-xl">Kuryer olib ketdi</Typography>
            </div>
          ),
        },
        {
          value: 6,
          label: (
            <div className="flex justify-between gap-5 ps-5 w-full items-center">
              <Typography className="text-xl">Yandexdan yuborildi</Typography>
            </div>
          ),
        },
      ],
    },
    {
      type: "card",
      title: "Karta orqali to'lov kiritish",
      fieldName: "paid_by_card",
      placeholder: "Karta bilan to'lov",
    },
    {
      type: "cash",
      title: "Naqd pul orqali kiritish",
      fieldName: "paid_by_cash",
      placeholder: "Naqd pul bilan to'lov",
    },
    {
      type: "discounted_fee",
      title: "Chegirma orqali kiritish",
      fieldName: "discounted_fee",
      placeholder: "Chegirma bilan to'lov",
    },
    {
      type: "payme",
      title: "Payme orqali kiritish",
      fieldName: "paid_by_payme",
      placeholder: "Payme bilan to'lov",
    },
    {
      type: "comment",
      title: "Izoh yozish",
      fieldName: "comment",
      placeholder: "Izoh yozish",
      isTextArea: true,
    },
  ];

  return (
    <>
      {modalsConfig.map((config) => (
        <Modal
          key={`${item.id}-${config.type}`}
          title={<span className="text-[24px]">{config.title}</span>}
          open={
            modalOpen[item.id]?.type === config.type && modalOpen[item.id]?.open
          }
          onCancel={() => closeModal(item.id)}
          footer={null}
        >
          <Form
            className="mt-10"
            // initialValues={{
            //   [config.fieldName]: item[config.fieldName as keyof IDashboards],
            // }}
            onFinish={(values) => handleLocalSave(item.id, values)}
          >
            <Form.Item name={config.fieldName}>
              {config.isRadio ? (
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "full",
                  }}
                  options={config.options}
                />
              ) : config.isTextArea ? (
                <TextArea
                  className="max-h-20 !min-h-20 text-base font-semibold"
                  placeholder={config.placeholder}
                />
              ) : (
                <Input type="number" placeholder={config.placeholder} />
              )}
            </Form.Item>

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
            </div>

            <Form.Item className="flex justify-end mt-5 mb-0">
              <Button type="primary" htmlType="submit" className="p-4 text-lg">
                ok
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ))}
    </>
  );
};

export default PaymentModals;
