import { Typography } from "antd";

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
  return (
    <>
      <div className="rounded-lg border-2 border-gray-600 ">
        <div
          className={`p-5 rounded-lg ${
            item.status === 1 ? "bg-[#FE5222]" : "bg-gray-300"
          } `}
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
