import { Typography } from "antd";

interface PostomatCardsProps {
  id: number;
  block_counts: number;
  locker_location_id: number;
  status: number;
}

export const PostomatCards = ({ item }: { item: PostomatCardsProps }) => {
  return (
    <>
      <div className="rounded-3xl border-2 border-gray-300 hover:border-blue-500">
        <div className="bg-blue-500 p-5 rounded-t-3xl">
          <Typography className="text-xl font-bold text-white">
            Postomat
          </Typography>
        </div>
        <div className="p-3 bg-white rounded-b-3xl">
          <div>
            <div className="flex border-b-2 justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <Typography className="text-lg font-semibold">
                  block_counts
                </Typography>
              </div>
              <Typography className="text-xl font-bold text-black">
                {item.block_counts}{" "}
              </Typography>
            </div>
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <Typography className="text-lg font-semibold">
                  locker_location_id
                </Typography>
              </div>
              <Typography className="text-xl font-bold text-black">
                {item.locker_location_id}{" "}
              </Typography>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex gap-3 items-center">
                <Typography className="text-lg font-semibold">
                  status
                </Typography>
              </div>
              <Typography className="text-xl font-bold text-black">
                {item.status}{" "}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
