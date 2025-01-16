import React from "react";
import { Modal, Form, Input, Button } from "antd";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: { value: number }) => void;
  title: string;
  placeholder: string;
  initialValue?: number;
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSubmit,
  title,
  placeholder,
  initialValue,
}) => {
  return (
    <Modal
      title={<span className="text-[24px]">{title}</span>}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        className="mt-10"
        initialValues={{ value: initialValue }}
        onFinish={onSubmit}
      >
        <Form.Item name="value">
          <Input type="number" placeholder={placeholder} />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" className="p-4 text-lg">
            Ok
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomModal;
