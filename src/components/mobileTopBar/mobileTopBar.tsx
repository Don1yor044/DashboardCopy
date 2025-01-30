import { Input, Typography } from "antd";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import searchStore from "../../store/searchStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

export const MobileTopBar = observer(() => {
  const [search, setSearch] = useState<string>("");

  const handleClick = () => {
    searchStore.setSearchDashboard(search);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleClear = () => {
    setSearch("");
    searchStore.setSearchDashboard("");
  };
  const location = useLocation();

  return (
    <div className="pt-3 rounded-b-3xl px-3 bg-gradient-to-r from-[#FF5024] to-[#FE914E] max-h-16 pt-safe">
      {location.pathname === "/dashboard" ? (
        <>
          <div className="flex gap-4 items-center">
            <img
              src="./Abu Sahiy Logo.png"
              alt="abuSahiy"
              className="w-24 object-contain"
            />
            <div className="bg-gray-50 flex gap-2 items-center rounded-full w-full mb-1 h-12 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
              <Input
                allowClear
                placeholder="Qidiruv..."
                value={search}
                onChange={handleChange}
                onClear={handleClear}
                className="border-none text-xl bg-gray-50"
              />
              <LuSearch
                size={25}
                color="#FE5222"
                onClick={handleClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <Typography className="text-white text-lg mb-1 font-bold">
            {location.pathname === "/filials" ? <>Filiallar</> : <></>}
            {location.pathname === "/filters" ? <>Filter</> : <></>}
            {location.pathname === "/postomat" ? <>Postomat</> : <></>}
          </Typography>
        </div>
      )}
    </div>
  );
});
