import React from "react";
import { Modal, Form, Input, Button, Typography, Radio } from "antd";
import { IDashboards } from "../../../types/types";
import { ModalType } from "../cardItems/cardItems";

const { TextArea } = Input;

interface PaymentModalProps {
  item: IDashboards;
  modalOpen: { [key: number]: { type: ModalType; open: boolean } };
  closeModal: (id: number) => void;
  handleLocalSave: (id: number, values: Partial<IDashboards>) => void;
}

const PaymentModals: React.FC<PaymentModalProps> = ({
  item,
  modalOpen,
  closeModal,
  handleLocalSave,
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
            initialValues={{
              [config.fieldName]: item[config.fieldName as keyof IDashboards],
            }}
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
                  className="max-h-20 !min-h-20"
                  placeholder={config.placeholder}
                />
              ) : (
                <Input type="number" placeholder={config.placeholder} />
              )}
            </Form.Item>
            <Form.Item className="flex justify-end">
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
