import { Input } from "antd";
import { LuSearch } from "react-icons/lu";

export const PaymeHeader = () => {
  return (
    <>
      <div className="bg-white flex gap-2 items-center rounded-full w-full h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
        <LuSearch size={25} color="#FE5222" />
        <Input
          allowClear
          placeholder="Payme qidiruv..."
          //   value={searchStore.searchArxive}
          //   onChange={(e) => handleChange(e.target.value)}
          className="border-none text-xl"
          disabled
        />
      </div>
    </>
  );
};
