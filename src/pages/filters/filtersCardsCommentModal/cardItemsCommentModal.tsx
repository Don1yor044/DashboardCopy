import { useState } from "react";
import { Button, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import baseURL from "../../../utils/api";

export const CardItemsCommentModal = ({
  isOpen,
  onClose,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  itemId: number | null;
}) => {
  const [commentType, setCommentType] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  // const [commentPassword, setCommentPassword] = useState("");

  const handleSendComment = async () => {
    const token = localStorage.getItem("token");
    const serviceId = localStorage.getItem("serviceId");
    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
    // if (commentType == 7 && "doni") {
    //   return errorToast("Parol noto'g'ri kiritildi !");
    // }
    try {
      await baseURL.put(
        `/api/client/dashboard/filter/${itemId}`,
        {
          comment: commentText,
          status: Number(commentType),
          service_user_id: Number(serviceId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleSendComment}
          disabled={!commentType || !commentText}
        >
          Send
        </Button>,
      ]}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Izoh yozish sababi</h3>
          <Radio.Group
            className="flex flex-col gap-3 font-semibold"
            value={commentType}
            onChange={(e) => setCommentType(e.target.value)}
          >
            {/* <Radio value="7" className="text-lg">
              Sotuvchi tomonidan berildi
            </Radio> */}
            <Radio value="8" className="text-lg">
              Aloqaga chiqmadi
            </Radio>
            <Radio value="9" className="text-lg">
              Gaplashilgan
            </Radio>
          </Radio.Group>
        </div>

        <TextArea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Izoh yozing !"
          className="!max-h-32 !min-h-32 font-semibold text-lg"
          rows={4}
        />
        {/* {commentType == 7 && (
          <>
            <Input
              value={commentPassword}
              placeholder="Parol kiritng !"
              className="text-base font-semibold"
              onChange={(e) => setCommentPassword(e.target.value)}
            />
          </>
        )} */}
      </div>
    </Modal>
  );
};
