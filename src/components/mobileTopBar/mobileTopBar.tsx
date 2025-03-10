import { Input, Typography } from "antd";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import searchStore from "../../store/searchStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

export const MobileTopBar = observer(() => {
  const [search, setSearch] = useState<string>("");
  const location = useLocation();
  const type = location.state?.type;

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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="pt-safe rounded-b-3xl px-3 bg-gradient-to-r from-[#FF5024] to-[#FE914E] max-h-16">
      {location.pathname === "/dashboard" ? (
        <>
          <div className="flex gap-4 items-center pt-1">
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
                onKeyDown={handleKeyPress}
                className="border-none text-xl bg-gray-50"
              />
              <LuSearch
                size={25}
                color="#FE5222"
                onClick={handleClick}
                tabIndex={0}
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
            {location.pathname === "/payme" ? <>Payme</> : <></>}
            {location.pathname === "/report" ? <>Report</> : <></>}
            {location.pathname === "/discounted" ? (
              <>
                {type === "card"
                  ? "Karta orqali to'varlar"
                  : type === "payme"
                  ? "Payme orqali to'lovlar"
                  : type === "cash"
                  ? "Naqt orqali to'lovlar"
                  : type === "discounted"
                  ? "Chegirma orqali to'lovlar"
                  : type === "delivered"
                  ? "Yetkazilgan tovarlar"
                  : ""}
              </>
            ) : (
              <></>
            )}
          </Typography>
        </div>
      )}
    </div>
  );
});
