import { LuFilter } from "react-icons/lu";
import { PiBuildings } from "react-icons/pi";
import { RiBuilding4Line, RiHome6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

export const MobileLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "!text-[#FE5222]" : "text-black";
  };

  return (
    <div className="fixed bottom-0 w-full bg-white rounded-t-xl z-10 ">
      <div className="flex justify-between gap-2 px-2">
        <div
          className={`flex flex-col items-center justify-center rounded-lg p-2 w-20 cursor-pointer ${getActiveClass(
            "/dashboard"
          )}`}
          onClick={() => navigate("/dashboard")}
        >
          <RiHome6Line size={23} />
          <div className="mt-2">Dashboard</div>
        </div>
        <div
          className={`flex flex-col items-center justify-center rounded-lg p-2 w-20 cursor-pointer ${getActiveClass(
            "/filials"
          )}`}
          onClick={() => navigate("/filials")}
        >
          <PiBuildings size={23} />
          <div className="mt-2">Filiallar</div>
        </div>
        <div
          className={`flex flex-col items-center justify-center rounded-lg p-2 w-20 cursor-pointer ${getActiveClass(
            "/filters"
          )}`}
          onClick={() => navigate("/filters")}
        >
          <LuFilter size={23} />
          <div className="mt-2">Filter</div>
        </div>
        <div
          className={`flex flex-col items-center justify-center rounded-lg p-2 w-20 cursor-pointer ${getActiveClass(
            "/postomat"
          )}`}
          onClick={() => navigate("/postomat")}
        >
          <RiBuilding4Line size={23} />
          <div className="mt-2">Postomat</div>
        </div>
      </div>
    </div>
  );
};
