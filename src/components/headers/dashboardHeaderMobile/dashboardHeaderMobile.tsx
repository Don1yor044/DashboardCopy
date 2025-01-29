import { observer } from "mobx-react-lite";

export const DashboardHeaderMobile = observer(() => {
  return (
    <>
      <div className="py-2 space-y-2 mt-20 pt-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 bg-white border-2 border-gray-100 rounded-xl p-2">
            <p className="text-base font-semibold border-e pe-1">
              Kunlik o'girligi
            </p>
            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              5444450
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-gray-100 rounded-xl p-2">
            <p className="text-base font-semibold border-e pe-1">
              Kunlik qolgani
            </p>
            <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              455464
            </p>
          </div>
        </div>{" "}
        <div className="flex items-center justify-between gap-2 bg-white border-2 border-gray-100 rounded-xl p-2">
          <p className="text-xl font-semibold">Kunlik summa</p>
          <p className="text-xl font-semibold">1254,552 sum</p>
        </div>
      </div>
    </>
  );
});
