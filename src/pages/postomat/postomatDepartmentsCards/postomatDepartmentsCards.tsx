import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

interface PostomatDepartmentsCardsProps {
  id: number;
  status: number;
  name?: string;
  block_number: string;
  cell_number: string;
  locker_id: number;
  command: string;
  created_at: string;
  size: number;
  updated_at: string;
}

export const PostomatDepartmentsCards = ({
  dataCourse,
  item,
}: {
  item: PostomatDepartmentsCardsProps;
  dataCourse: PostomatDepartmentsCardsProps[];
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="rounded-lg border-2 border-gray-600 cursor-pointer"
        onClick={() => navigate(`/DepartmentsCardsProduct/${item.id}`)}
      >
        <div
          className={`p-5 rounded-lg 
          ${item.status === 1 ? "bg-[#FE5222] " : "bg-gray-300 "}
          ${["01", "02"].includes(item.cell_number) ? "py-14" : ""}
          ${
            ["03", "04", "19", "20", "21", "22"].includes(item.cell_number)
              ? "py-10"
              : ""
          }
        `}
        >
          <div className="flex justify-between items-center">
            <Typography className="text-xl font-bold text-white">
              {item.cell_number}
            </Typography>
            <Typography className="text-sm font-bold text-gray-100">
              {item.cell_number}/ {dataCourse.length}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
