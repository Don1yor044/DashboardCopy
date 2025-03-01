import { Typography } from "antd";
export interface CallCenterShippedStatusProps {
  subStatus: number;
  setSubStatus: (status: number) => void;
  subStatusSort: {
    onLine: number;
    onUZ: number;
    uzShipped: number;
    onStation: number;
  };
}

export const CallCenterShippedStatus = ({
  subStatus,
  setSubStatus,
  subStatusSort,
}: CallCenterShippedStatusProps) => {
  const statuses = [
    { label: "On the way", value: subStatusSort?.onLine, id: 0 },
    { label: "In Uzbekistan", value: subStatusSort?.onUZ, id: 1 },
    { label: "Shipped", value: subStatusSort?.uzShipped, id: 3 },
    { label: "On point", value: subStatusSort?.onStation, id: 2 },
  ];

  return (
    <div className="bg-blue-100 p-3 rounded-xl flex gap-5 items-center justify-between w-[60%] mt-3">
      {statuses.map((status, index) => (
        <div key={status.id} className="flex items-center gap-5">
          <div
            className="px-5 cursor-pointer"
            onClick={() => setSubStatus(status.id)}
          >
            <Typography
              className={`text-end text-base font-semibold ${
                subStatus === status.id ? "text-blue-900" : "text-gray-400"
              }`}
            >
              {status.value}
            </Typography>
            <Typography
              className={`text-base font-semibold ${
                subStatus === status.id ? "text-blue-900" : "text-gray-400"
              }`}
            >
              {status.label}
            </Typography>
          </div>
          {index < statuses.length - 1 && (
            <div className="h-[2px] bg-gray-400 w-20"></div>
          )}
        </div>
      ))}
    </div>
  );
};
