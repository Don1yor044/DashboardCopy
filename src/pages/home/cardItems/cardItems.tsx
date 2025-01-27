import React, { useState, useEffect } from "react";
import { IDashboards } from "../../../types/types";
import { toast } from "react-toastify";
import baseURL from "../../../utils/api";
import PaymentModals from "../paymentModals/paymentModals";
import { observer } from "mobx-react-lite";
import { CardItemsInside } from "../cardItemsInside/cardItemsInside";
import { errorToast, successToast } from "../../../components/toastManager";
export type ModalType =
  | "card"
  | "cash"
  | "payme"
  | "discounted_fee"
  | "status"
  | "comment";

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

    const notifySuccess = () => successToast("Muvaffaqiyatli saqlandi !");
    const notifyError = () => errorToast("Xatolik qaytadan urinib ko'ring !");
    const notifyWarning = (data: string) =>
      toast.warning(`To'lanadigan summa miqdori: ${data} so'm `, {
        className: "text-lg w-[400px]",
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
            paid_by_card: Number(item.paid_by_card),
            paid_by_cash: Number(item.paid_by_cash),
            paid_by_payme: Number(item.paid_by_payme),
            discounted_fee: Number(item.discounted_fee),
            status: Number(item.status),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

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
            <CardItemsInside
              item={item}
              isSelected={isSelected}
              changedItems={changedItems}
              handleBackendSave={handleBackendSave}
              openModal={openModal}
              onSelect={onSelect}
              setUserId={setUserId}
            />
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
      </>
    );
  }
);
