import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { IDashboards } from "../../../types/types";
import { FiPlus } from "react-icons/fi";
import api from "../../../utils/api";
import TextArea from "antd/es/input/TextArea";
import { toast, ToastContainer } from "react-toastify";
import { BsCheckLg } from "react-icons/bs";

export const CardItems = ({
  dataCourse,
  fetchData,
}: {
  dataCourse: IDashboards[];
  fetchData: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [formDataMap, setFormDataMap] = useState<{
    [key: number]: any;
  }>({});

  const notifySuccess = () =>
    toast.success("Muvaffaqiyatli saqlandi !", {
      className: "text-xl",
    });
  const notifyError = () =>
    toast.error("Xatolik qaytadan urinib ko'ring !", {
      className: "text-lg",
    });
  const notifyWarning = (msg: string) =>
    toast.warning(msg, { className: "text-lg w-[370px]" });

  const handleEditClick = (field: string | number | null, cardId: number) => {
    if (field === "comment") {
      setActiveItemId(cardId);
      setCommentText(formDataMap[cardId]?.comment || "");
      setIsModalOpen(true);
      return;
    }

    if (editingCardId === cardId) {
      setEditingField(null);
      setEditingCardId(null);
    } else {
      setEditingCardId(cardId);
      setEditingField(field);
    }
  };

  const handleInputChange = (
    cardId: number,
    field: string | number,
    value: string
  ) => {
    setFormDataMap((prevMap) => ({
      ...prevMap,
      [cardId]: {
        ...prevMap[cardId],
        [field]: value,
      },
    }));
  };

  // Modal'dagi OK tugmasi bosilganda
  const handleModalOk = () => {
    if (activeItemId) {
      handleInputChange(activeItemId, "comment", commentText);
      setIsModalOpen(false);
      setCommentText("");
    }
  };

  const handleSave = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
    const formData = formDataMap[id];
    try {
      const payload: { [key: string]: any } = {};

      if (formData.paidByCard !== undefined && formData.paidByCard !== null) {
        payload.paid_by_card = formData.paidByCard;
      }
      if (formData.paidByCash !== undefined && formData.paidByCash !== null) {
        payload.paid_by_cash = formData.paidByCash;
      }
      if (formData.paidByPayme !== undefined && formData.paidByPayme !== null) {
        payload.paid_by_payme = formData.paidByPayme;
      }
      if (formData.comment !== undefined && formData.comment !== null) {
        payload.comment = formData.comment;
      }

      const response = await api.put(`/api/client/dashboard/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (response.data.ret === -1) {
        notifyError();
      } else if (response.data.ret === 0) {
        notifySuccess();
        setTimeout(() => {
          fetchData();
        }, 1000);
      } else {
        notifyWarning(response.data.msg);
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };
  return (
    <>
      {dataCourse.map((items) => {
        const formData = formDataMap[items.id] || {
          paidByCard: items.paid_by_card,
          paidByCash: items.paid_by_cash,
          paidByPayme: items.paid_by_payme,
          comment: items.comment,
        };

        return (
          <div
            className="bg-white rounded-xl border border-transparent hover:border-[#FE5222]"
            key={items.id}
          >
            <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
              <div className="flex gap-2 w-full">
                <div className="absolute right-[0px] top-[0px]">
                  <Button
                    type="default"
                    className="w-10 h-10 p-0 rounded-tr-xl"
                  >
                    <BsCheckLg size={25} />
                  </Button>
                </div>
                <div className="w-[35%] border-e text-lg bg-[#FE5222] rounded-s-lg p-3 text-white space-y-2 ">
                  {/* Fields headers */}
                  <div className="border-b">ID:</div>
                  <div className="border-b">Name:</div>
                  <div className="border-b">Phone:</div>
                  <div className="border-b">Address:</div>
                  <div className="border-b">City:</div>
                  <div className="border-b">Weight:</div>
                  <div className="border-b">Status:</div>
                  <div className="border-b">Express_num:</div>
                  <div className="border-b">Payment Fee:</div>
                  <div className="border-b">Paid by_card:</div>
                  <div className="border-b">Paid by_cash:</div>
                  <div className="border-b">Paid by_payme:</div>
                  <div className="border-b">Order ID:</div>
                  <div className="border-b">Express_line Id:</div>
                  <div className="border-b">Comment:</div>
                  <div className="border-b">PurchaseTime:</div>
                  <div>Quantity:</div>
                </div>
                <div className="w-[65%] text-lg py-3 px-2 space-y-2">
                  <div className="border-b">
                    {items.user_id || "mavjud emas"}
                  </div>
                  <div className="border-b">
                    {items.full_name || "mavjud emas"}
                  </div>
                  <div className="border-b">{items.phone || "mavjud emas"}</div>
                  <div className="border-b">
                    {items.address || "mavjud emas"}
                  </div>
                  <div className="border-b">{items.city || "mavjud emas"}</div>
                  <div className="border-b">
                    {items.weight || "mavjud emas"}
                  </div>
                  <div className="border-b">
                    {items.status || "mavjud emas"}
                  </div>
                  <div className="border-b">
                    {items.express_num || "mavjud emas"}
                  </div>
                  <div className="border-b">
                    {items.payment_fee || "mavjud emas"}
                  </div>

                  {/* Paid by_card */}
                  <div className="border-b flex items-center cursor-pointer">
                    {editingCardId === items.id &&
                    editingField === "paidByCard" ? (
                      <Input
                        value={formData.paidByCard}
                        onChange={(e) =>
                          handleInputChange(
                            items.id,
                            "paidByCard",
                            e.target.value
                          )
                        }
                        className="w-full h-7"
                      />
                    ) : (
                      <span
                        onClick={() => handleEditClick("paidByCard", items.id)}
                      >
                        {formData.paidByCard ||
                          items.paid_by_card ||
                          "mavjud emas"}
                      </span>
                    )}
                  </div>

                  {/* Paid by_cash */}
                  <div className="border-b flex items-center cursor-pointer">
                    {editingCardId === items.id &&
                    editingField === "paidByCash" ? (
                      <Input
                        value={formData.paidByCash}
                        onChange={(e) =>
                          handleInputChange(
                            items.id,
                            "paidByCash",
                            e.target.value
                          )
                        }
                        className="w-full h-7"
                      />
                    ) : (
                      <span
                        onClick={() => handleEditClick("paidByCash", items.id)}
                      >
                        {formData.paidByCash ||
                          items.paid_by_cash ||
                          "mavjud emas"}
                      </span>
                    )}
                  </div>
                  {/* Paid by_payme */}
                  <div className="border-b flex items-center cursor-pointer">
                    {editingCardId === items.id &&
                    editingField === "paidByPayme" ? (
                      <Input
                        value={formData.paidByPayme}
                        onChange={(e) =>
                          handleInputChange(
                            items.id,
                            "paidByPayme",
                            e.target.value
                          )
                        }
                        className="w-full h-7"
                      />
                    ) : (
                      <span
                        onClick={() => handleEditClick("paidByPayme", items.id)}
                      >
                        {formData.paidByPayme ||
                          items.paid_by_payme ||
                          "mavjud emas"}
                      </span>
                    )}
                  </div>
                  <div className="border-b">
                    {items.order_id || "mavjud emas"}
                  </div>
                  <div className="border-b">
                    {items.express_line || "mavjud emas"}
                  </div>

                  {/* Comment Field */}
                  <div className="border-b flex pe-2">
                    <div className="border-b flex items-center">
                      <span>
                        {formData.comment || items.comment || "mavjud emas"}
                      </span>
                    </div>
                    <span
                      className="ml-auto cursor-pointer"
                      onClick={() => handleEditClick("comment", items.id)}
                    >
                      <div className="bg-[#FE5222] text-white rounded-full p-[6px]">
                        <FiPlus size={15} />
                      </div>
                    </span>
                  </div>

                  <div className="border-b">
                    {items.purchase_time || "mavjud emas"}
                  </div>
                  <div>{items.quantity || "mavjud emas"}</div>
                </div>
              </div>

              <div className="absolute pr-3 bottom-3 right-0">
                <Button
                  type="primary"
                  className="ml-2"
                  onClick={() => handleSave(items.id)}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <Modal
        title="Comment qo'shish"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setCommentText("");
          setActiveItemId(null);
        }}
        footer={null}
      >
        <TextArea
          className="!min-h-52 !max-h-52 mt-5 bg-gray-100"
          placeholder="Comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          type="text"
          onClick={handleModalOk}
          className="w-full block mt-3 rounded-full bg-[#FE5222] text-white h-10"
        >
          OK
        </Button>
      </Modal>
      {/* <ToastContainer /> */}
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
