import { Col, Row } from "antd";
import { IfiltersData } from "../../../types/types";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { CardItemsCommentModal } from "../filtersCardsCommentModal/cardItemsCommentModal";

export const FiltersCards = ({ data }: { data: IfiltersData[] }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const openCommentModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setSelectedUserId(null);
    setIsCommentModalOpen(false);
  };

  return (
    <>
      <Row gutter={[20, 20]} className="mt-5">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Col span={8} key={index}>
              <div className="bg-white rounded-xl border-2">
                <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                  <div className="flex gap-2 w-full">
                    <div className="w-[35%] border-e text-lg bg-yellow-500 rounded-s-lg p-3 text-white space-y-2">
                      <div className="border-b">ID:</div>
                      <div className="border-b">Ism:</div>
                      <div className="border-b">Telefon raqam:</div>
                      <div className="border-b">Manzil:</div>
                      <div className="border-b">Shahar:</div>
                      <div className="border-b">To'lov:</div>
                      <div className="border-b">Soni:</div>
                      <div className="border-b">Comment:</div>
                      <div className="border-b">Sotib olingan:</div>
                      <div>Punktga kelgan:</div>
                    </div>
                    <div className="w-[65%] text-lg py-3 px-2 space-y-2">
                      <div className="border-b">{item.user_id || "—"}</div>
                      <div className="border-b">{item.full_name || "—"}</div>
                      <div className="border-b">{item.phone || "—"}</div>
                      <div className="border-b">{item.address || "—"}</div>
                      <div className="border-b">{item.city || "—"}</div>
                      <div className="border-b">{item.payment_fees || "—"}</div>
                      <div className="border-b">
                        {item.express_num || item.express_nums || "—"}
                      </div>
                      <div className="border-b flex justify-between items-center">
                        {item.comment || "—"}
                        <div
                          className="bg-[#1677ff] text-white rounded-full p-[4px] cursor-pointer h-8 mt-[-3px]"
                          onClick={() => openCommentModal(item.user_id)} // O'rnatish
                        >
                          <CiEdit size={23} />
                        </div>
                      </div>
                      <div className="border-b">
                        {item.purchase_time || "—"}
                      </div>
                      <div>
                        {item.created_at
                          ? new Date(item.created_at)
                              .toISOString()
                              .replace("T", " ")
                              .substring(0, 19)
                          : "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
      <CardItemsCommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        itemId={selectedUserId} // Tanlangan `user_id` ni uzatish
      />
    </>
  );
};
