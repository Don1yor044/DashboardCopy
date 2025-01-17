import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { IDashboards } from "../../../types/types";
import { toast, ToastContainer } from "react-toastify";
import { BsCheckLg, BsCurrencyDollar } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { HiOutlineCreditCard } from "react-icons/hi";
import baseURL from "../../../utils/api";

import { MdOutlineDiscount } from "react-icons/md";
import PaymentModals from "../../paymentModals/paymentModals";
import { observer } from "mobx-react-lite";
type ModalType = "card" | "cash" | "payme" | "comment" | "discounted_fee";

export const CardItems = observer(
  ({
    dataCourse,
    fetchData,
    isSelected,
    onSelect,
    setUserId,
  }: {
    dataCourse: IDashboards[];
    fetchData: () => void;
    isSelected: number[];
    onSelect: (id: number) => void;
    setUserId: (id: number) => void;
  }) => {
    const [modalOpen, setModalOpen] = useState<{
      [key: number]: { type: ModalType; open: boolean };
    }>({});
    const [localData, setLocalData] = useState<IDashboards[]>(dataCourse);
    const [changedItems, setChangedItems] = useState<Set<number>>(new Set());

    useEffect(() => {
      setLocalData(dataCourse);
    }, [dataCourse]);

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
    const handleLocalSave = (id: number, values: Partial<IDashboards>) => {
      setLocalData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, ...values } : item))
      );
      setChangedItems((prev) => new Set(prev).add(id));
      closeModal(id);
    };

    const handleBackendSave = async (id: number) => {
      const item = localData.find((item) => item.id === id);
      if (!item) return;

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing or invalid");
        return;
      }

      try {
        const response = await baseURL.put(
          `/api/client/dashboard/${id}`,
          {
            paid_by_card: item.paid_by_card,
            paid_by_cash: item.paid_by_cash,
            paid_by_payme: item.paid_by_payme,
            discounted_fee: item.discounted_fee,
            comment: item.comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (response.data.ret === -1) {
          notifyError();
        } else if (response.data.ret === 0) {
          notifySuccess();
          setChangedItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
          await fetchData();
        } else {
          notifyWarning(response.data.data);
        }
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Failed to save data:", error);
        notifyError();
      }
    };

    const openModal = (item: IDashboards, type: ModalType) => {
      if (item.paid_at !== null) {
        notifyAlreadyPaid();
        return;
      }
      setModalOpen((prev) => ({ ...prev, [item.id]: { type, open: true } }));
    };

    const closeModal = (id: number) => {
      setModalOpen((prev) => ({
        ...prev,
        [id]: { type: "card", open: false },
      }));
    };

    return (
      <>
        {localData?.map((item) => (
          <div
            className={`bg-white rounded-xl border-2 ${
              isSelected.includes(item.id)
                ? "border-green-500"
                : "border-gray-300"
            }`}
            key={item.id}
          >
            <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
              <div className="flex gap-2 w-full">
                <div className="absolute right-[0px] top-[0px]">
                  <Button
                    type="default"
                    className={`w-10 h-10 p-0 rounded-tr-xl ${
                      isSelected.includes(item.id)
                        ? "text-green-500 border-green-500"
                        : "text-[#FE5222] border-[#FE5222]"
                    }`}
                    onClick={() => {
                      onSelect(item.id);
                      setUserId(item.user_id ?? 0);
                    }}
                  >
                    <BsCheckLg size={25} />
                  </Button>
                </div>
                <div
                  className={`w-[35%] border-e text-lg bg-[#FE5222] rounded-s-lg p-3 text-white space-y-2 ${
                    isSelected.includes(item.id)
                      ? "bg-green-600"
                      : "bg-[#FE5222]"
                  }`}
                >
                  <div className="border-b">ID:</div>
                  <div className="border-b">Ism:</div>
                  <div className="border-b">Telefon Raqam:</div>
                  <div className="border-b">Manzil:</div>
                  <div className="border-b">Shahar:</div>
                  <div className="border-b">Og'irligi:</div>
                  <div className="border-b">Track Number:</div>
                  <div className="border-b">To'lov summa:</div>
                  <div className="border-b">Karta to'lov:</div>
                  <div className="border-b">Naqt to'lov:</div>
                  <div className="border-b">Payme to'lov:</div>
                  <div className="border-b">Chegirma:</div>
                  <div className="border-b">Avto Kargo:</div>
                  <div className="border-b">Izoh:</div>
                  <div className="border-b">Xarid vaqt:</div>
                  <div>Miqdori:</div>
                </div>
                <div className="w-[65%] text-lg py-3 px-2 space-y-2">
                  <div className="border-b">{item.user_id || "—"}</div>
                  <div className="border-b">{item.full_name || "—"}</div>
                  <div className="border-b">{item.phone || "—"}</div>
                  <div className="border-b">{item.address || "—"}</div>
                  <div className="border-b">{item.city || "—"}</div>
                  <div className="border-b">{item.weight || "—"}</div>
                  <div className="border-b">{item.express_num || "—"}</div>
                  <div className="border-b text-red-500 font-semibold">
                    {item.payment_fee !== null && item.payment_fee !== undefined
                      ? `${item.payment_fee} so'm`
                      : "—"}
                  </div>
                  <div className="border-b flex justify-between items-center text-green-500 font-semibold">
                    {item.paid_by_card === null || item.paid_by_card === 0
                      ? "—"
                      : `${item.paid_by_card} so'm`}
                    <Button
                      type="primary"
                      onClick={() => openModal(item, "card")}
                      className="rounded-full !pt-1 h-8 mt-[-4px]"
                      icon={<HiOutlineCreditCard size={20} />}
                    />
                  </div>
                  <div className="border-b flex text-green-500 font-semibold justify-between items-center">
                    {item.paid_by_cash === null || item.paid_by_cash === 0
                      ? "—"
                      : `${item.paid_by_cash} so'm`}
                    <Button
                      type="primary"
                      onClick={() => openModal(item, "cash")}
                      className="rounded-full pt-1 h-8 mt-[-3px]"
                      icon={<BsCurrencyDollar size={19} />}
                    />
                  </div>
                  <div className="border-b flex text-green-500 font-semibold justify-between items-center">
                    {item.paid_by_payme === null || item.paid_by_payme === 0
                      ? "—"
                      : `${item.paid_by_payme} so'm`}

                    <Button
                      type="primary"
                      onClick={() => openModal(item, "payme")}
                      className="rounded-full h-8 mt-[-3px]"
                      icon={<img src="./PaymeIconSvg.svg" alt="payme" />}
                    />
                  </div>
                  <div className="border-b flex justify-between text-green-500 font-semibold items-center">
                    {item.discounted_fee === null || item.discounted_fee === 0
                      ? "—"
                      : `${item.discounted_fee} so'm`}

                    <Button
                      type="primary"
                      onClick={() => openModal(item, "discounted_fee")}
                      className="rounded-full !pt-1 h-8 mt-[-4px]"
                      icon={<MdOutlineDiscount size={20} />}
                    />
                  </div>
                  <div className="border-b">{item.express_line || "—"}</div>
                  <div className="border-b flex justify-between items-center">
                    {item.comment || "—"}
                    <div
                      className="bg-[#1677ff] text-white rounded-full p-[4px] cursor-pointer h-8 mt-[-3px]"
                      onClick={() => openModal(item, "comment")}
                    >
                      <CiEdit size={23} />
                    </div>
                  </div>
                  <div className="border-b">{item.purchase_time || "—"}</div>
                  <div>{item.quantity || "—"}</div>
                </div>
              </div>
              {changedItems.has(item.id) && (
                <div className="absolute pr-3 bottom-3 right-0">
                  <Button
                    type="primary"
                    onClick={() => handleBackendSave(item.id)}
                  >
                    Send
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {localData?.map((item) => (
          <React.Fragment key={`modals-${item.id}`}>
            <PaymentModals
              item={item}
              modalOpen={modalOpen}
              closeModal={closeModal}
              handleLocalSave={handleLocalSave}
            />
          </React.Fragment>
        ))}
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
  }
);
