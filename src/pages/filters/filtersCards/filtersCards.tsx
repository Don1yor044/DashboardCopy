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
      <Row gutter={[20, 10]} className="mt-5">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Col span={24} md={8} key={index}>
              <div className="bg-white rounded-xl border-2">
                <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                  <div className="flex gap-2 w-full">
                    <div className="w-[35%] border-e text-base bg-yellow-500 rounded-s-lg p-3 text-white space-y-2">
                      <div className="border-b">ID:</div>
                      <div className="border-b">Ism:</div>
                      {item.phone !== undefined && (
                        <div className="border-b">Telefon raqam:</div>
                      )}

                      <div className="border-b">Manzil:</div>
                      <div className="border-b">Shahar:</div>
                      {item.payment_fees !== undefined && (
                        <div className="border-b">To'lov:</div>
                      )}
                      {item.express_nums !== undefined && (
                        <div className="border-b">Soni:</div>
                      )}
                      {item.comment !== undefined && (
                        <div className="border-b">Comment:</div>
                      )}
                      {item.purchase_time !== undefined && (
                        <div className="border-b">Sotib olingan:</div>
                      )}
                      {item.created_at !== undefined && (
                        <div className={`${item.count && "border-b"} `}>
                          Kelgan sanasi:
                        </div>
                      )}
                      {item.count !== undefined && <div>Soni:</div>}
                    </div>

                    {/* {"2chi qator"} */}
                    <div className="w-[65%] text-base py-3 px-2 space-y-2">
                      <div className="border-b">{item.user_id || "—"}</div>
                      <div className="border-b">{item.full_name || "—"}</div>
                      {item.phone !== undefined && (
                        <div className="border-b">{item.phone || "—"}</div>
                      )}
                      {item.address !== undefined &&
                      item.address.trim() !== "" ? (
                        <div className="border-b">{item.address}</div>
                      ) : (
                        <div className="border-b ">{"—"}</div>
                      )}
                      <div className="border-b">{item.city || "—"}</div>
                      {item.payment_fees !== undefined && (
                        <div className="border-b">
                          {item.payment_fees || "—"}
                        </div>
                      )}{" "}
                      {item.express_nums !== undefined && (
                        <div className="border-b">
                          {item.express_nums || "—"}
                        </div>
                      )}
                      {item.comment !== undefined && (
                        <div className="border-b flex justify-between items-center">
                          {item.comment || "—"}{" "}
                          <div
                            className="bg-[#1677ff] text-white rounded-full p-[4px] cursor-pointer h-8 mt-[-3px]"
                            onClick={() => openCommentModal(item.user_id)}
                          >
                            <CiEdit size={23} />
                          </div>
                        </div>
                      )}
                      {item.purchase_time !== undefined && (
                        <div className="border-b">
                          {item.purchase_time || "—"}
                        </div>
                      )}
                      {item.created_at !== undefined && (
                        <div className={`${item.count && "border-b"} `}>
                          {item.created_at
                            ? new Date(item.created_at)
                                .toISOString()
                                .replace("T", " ")
                                .substring(0, 19)
                            : "—"}
                        </div>
                      )}
                      {item.count !== undefined && (
                        <div>{item.count || "—"}</div>
                      )}
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
