import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { IDashboards } from "../../types/types";

const { TextArea } = Input;

interface PaymentModalProps {
  item: any;
  modalOpen: Record<string, any>;
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
      title: "Discounted orqali kiritish",
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
              [config.fieldName]: item[config.fieldName],
            }}
            onFinish={(values) => handleLocalSave(item.id, values)}
          >
            <Form.Item name={config.fieldName}>
              {config.isTextArea ? (
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
