import { Typography } from "antd";

interface PostomatDepartmentsCardsProps {
  id: number;
  status: number;
  name?: string;
  block_number: number;
  cell_number: number;
  locker_id: number;
}

export const PostomatDepartmentsCards = ({
  item,
}: {
  item: PostomatDepartmentsCardsProps;
}) => {
  return (
    <>
      <div
        className={`rounded-3xl border-2 ${
          item.status === 2 ? "border-[#FE5222]" : "border-green-500"
        }`}
      >
        <div
          className={`${
            item.status === 2 ? "bg-[#FE5222]" : "bg-green-500"
          }  p-4 md:p-5 rounded-t-3xl`}
        >
          <div className="flex justify-between items-center">
            <Typography className="text-xl font-bold text-white">
              0 {item.id}
            </Typography>
            <Typography className="text-sm font-bold text-gray-100">
              0{item.id} / 8
            </Typography>
          </div>
        </div>
        <div className="p-2 md:p-5 bg-white rounded-b-3xl">
          <div className="flex border-b-2 justify-between items-center py-2">
            <Typography className="text-lg font-semibold">
              block_number
            </Typography>
            <Typography className="text-xl font-bold text-black">
              {item.block_number}
            </Typography>
          </div>
          <div className="flex items-center border-b-2 justify-between py-2">
            <Typography className="text-lg font-semibold">
              cell_number
            </Typography>
            <Typography className="text-xl font-bold text-black">
              {item.cell_number}
            </Typography>
          </div>
          <div className="flex items-center border-b-2 justify-between py-2">
            <Typography className="text-lg font-semibold">status</Typography>
            <Typography className="text-xl font-bold text-black">
              {item.status}
            </Typography>
          </div>
          <div className="flex justify-between py-2">
            <Typography className="text-lg font-semibold">locker_id</Typography>
            <Typography className="text-xl font-bold text-black">
              {item.locker_id}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
