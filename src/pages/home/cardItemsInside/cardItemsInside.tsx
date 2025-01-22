import { Button } from "antd";
import { BsCheckLg, BsCurrencyDollar } from "react-icons/bs";
import { priceFormatter } from "../../../components/priceFormat/priceFormat";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineDiscount } from "react-icons/md";
import { IDashboards } from "../../../types/types";
import { ModalType } from "../cardItems/cardItems";
import { CiDeliveryTruck, CiEdit } from "react-icons/ci";
import { kgFormatter } from "../../../components";

export const CardItemsInside = ({
  item,
  isSelected,
  changedItems,
  handleBackendSave,
  openModal,
  onSelect,
  setUserId,
}: {
  item: IDashboards;
  isSelected: number[];
  changedItems: Set<number>;
  handleBackendSave: (id: number) => void;
  openModal: (item: IDashboards, type: ModalType) => void;
  onSelect: (id: number) => void;
  setUserId: (id: number) => void;
}) => {
  const UserRole = localStorage.getItem("Role");

  return (
    <>
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
              isSelected.includes(item.id) ? "bg-green-600" : "bg-[#FE5222]"
            }`}
          >
            <div className="border-b">ID:</div>
            <div className="border-b">Ism:</div>
            <div className="border-b">Telefon Raqam:</div>
            <div className="border-b">Manzil:</div>
            <div className="border-b">Shahar:</div>
            <div className="border-b">Og'irligi:</div>
            <div className="border-b">Status:</div>
            <div className="border-b">Track Number:</div>
            <div className="border-b">To'langan Vaqti:</div>
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
            <div className="border-b">
              {kgFormatter(Number(item.weight)) || "—"}
            </div>
            <div className="border-b flex justify-between">
              {(() => {
                switch (item.status) {
                  case 1:
                    return "Punkda";
                  case 2:
                    return "Mijoz o'zi olib ketti";
                  case 3:
                    return "Pochtadan yuborildi";
                  case 4:
                    return "Postomatga olib ketildi";
                  case 5:
                    return "Kuryer orqali yetkazildi";
                  case 6:
                    return "Yandex orqali yetkazildi";
                  default:
                    return "—";
                }
              })()}
              <div
                className="bg-[#1677ff] text-white rounded-full p-[4px] cursor-pointer h-8 mt-[-3px]"
                onClick={() => openModal(item, "status")}
              >
                <CiDeliveryTruck size={23} />
              </div>
            </div>
            <div className="border-b">{item.express_num || "—"}</div>
            <div className="border-b">{item.paid_at || "—"}</div>
            <div className="border-b text-red-500 font-semibold">
              {item.payment_fee !== null && item.payment_fee !== undefined
                ? `${priceFormatter(item.payment_fee)} so'm`
                : "—"}
            </div>
            <div className="border-b flex justify-between items-center text-green-500 font-semibold">
              {item.paid_by_card === null || item.paid_by_card === 0
                ? "—"
                : `${priceFormatter(Number(item.paid_by_card))} so'm`}
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
                : `${priceFormatter(Number(item.paid_by_cash))} so'm`}
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
                : `${priceFormatter(Number(item.paid_by_payme))} so'm`}

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
                : `${priceFormatter(Number(item.discounted_fee))} so'm`}

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
              disabled={UserRole == "30" && true}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
