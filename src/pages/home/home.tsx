import { Cards } from "./cards";

export const Home = () => {
  return (
    <>
      <div
        className="2xl:w-[90%] w-[95%] flex gap-3 items-center bg-white rounded-xl p-6 "
        style={{
          boxShadow: "0px 0px 30px -10px rgba(34, 60, 80, 0.38)",
        }}
      >
        <div className="w-[33%] text-2xl font-bold ps-5 border-r">
          Karta orqali to’lovlar
        </div>
        <div className="w-[33%] text-2xl font-bold ps-5 border-r">
          Naxt orqali to’lovlar
        </div>
        <div className="w-[33%] text-2xl font-bold ps-5">
          Payme orqali to’lovlar
        </div>
      </div>
      <Cards />
    </>
  );
};
