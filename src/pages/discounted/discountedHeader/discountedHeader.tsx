import { Button, Input } from "antd";
import { Dispatch, SetStateAction } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const DiscountedHeader = ({
  searchDiscounted,
  setSearchDiscounted,
}: {
  searchDiscounted: string;
  setSearchDiscounted: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <div className="bg-white flex gap-2 items-center rounded-full w-full mb-1 h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
        <LuSearch size={25} color="#FE5222" />
        <Input
          allowClear
          placeholder="Chegirma orqali qidiruv..."
          value={searchDiscounted}
          onChange={(e) => setSearchDiscounted(e.target.value)}
          className="border-none text-xl"
        />
      </div>
      <div className="mt-5">
        <Button
          onClick={() => navigate("/filials")}
          className="rounded-xl text-[#54571]"
        >
          <IoMdArrowRoundBack />
          Orqaga
        </Button>
      </div>
    </div>
  );
};
