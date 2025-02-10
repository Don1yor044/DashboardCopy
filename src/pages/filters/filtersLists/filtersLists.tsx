import { Button, Drawer, Radio, Table } from "antd";
import { IfiltersData } from "../../../types/types";
import { FiltersListsColumns } from "./filterListsColumns/filterListsColumns";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import baseURL from "../../../utils/api";
import { successToast } from "../../../components/toastManager";

export const FiltersLists = ({
  data,
  activeButton,
  fetchUserData,
}: {
  data: IfiltersData[];
  activeButton: string;
  fetchUserData: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [commentType, setCommentType] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [itemId, setItemId] = useState<string | number | null>(null);

  const columns = FiltersListsColumns(activeButton, setOpen, setItemId);

  const handleSendComment = async () => {
    const token = localStorage.getItem("token");
    const serviceId = localStorage.getItem("serviceId");
    if (!token) {
      console.error("Token mavjud emas !");
      return;
    }
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
      setOpen(false);
      successToast("Muvaffaqiyatli bajarildi");
      fetchUserData();
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };
  return (
    <div>
      <div className="mt-2 overflow-auto shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-xl">
        <Table
          dataSource={data.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}
          columns={columns}
          pagination={false}
          className="rounded-xl"
        />
      </div>
      <Drawer
        title={<div className="text-xl">Izoh yozish sababi !</div>}
        open={open}
        onClose={() => setOpen(false)}
        width={400}
      >
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

        <TextArea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Izoh yozing !"
          className="!min-h-28 !max-h-28 text-lg font-semibold mt-5"
        />
        <Button
          type="primary"
          className="mt-5"
          onClick={handleSendComment}
          disabled={!commentType || !commentText}
        >
          Saqlash
        </Button>
      </Drawer>
    </div>
  );
};
