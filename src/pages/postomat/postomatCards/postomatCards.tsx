import { Typography } from "antd";

interface PostomatCardsProps {
  id: number;
  name: string;
}

export const PostomatCards = ({ item }: { item: PostomatCardsProps }) => {
  return (
    <>
      <div className="rounded-3xl border-2 border-gray-300 hover:border-[#FE5222]">
        <div className="bg-[#FE5222] p-3 md:p-5 rounded-t-3xl">
          <Typography className="text-xl font-bold text-white">
            {item.name}
          </Typography>
        </div>
        <div className="p-2 md:p-3 bg-white rounded-b-3xl">
          <div>
            <div className="flex border-b-2 justify-between items-center py-2">
              <div className="flex gap-3 items-center">
                <Typography className="text-base md:text-lg font-semibold">
                  block_counts
                </Typography>
              </div>
              <Typography className="text-xl font-bold text-black">
                2{" "}
              </Typography>
            </div>
            <div className="flex border-b-2 justify-between py-2">
              <div className="flex gap-3 items-center">
                <Typography className="text-base md:text-lg font-semibold">
                  locker_location_id
                </Typography>
              </div>
              <Typography className="text-xl font-bold text-black">
                3{" "}
              </Typography>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex gap-3 items-center">
                <Typography className="text-base md:text-lg font-semibold">
                  status
                </Typography>
              </div>
              <Typography className="text-xl font-bold text-black">
                5{" "}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
