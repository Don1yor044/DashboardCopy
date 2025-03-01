import { Button } from "antd";

export const CallCenterStatus = ({
  status,
  setStatus,
  allNumber,
  pendingNumber,
  paidNumber,
  deliveredNumber,
  shippedNumber,
  receivedNumber,
  invalidNumber,
  exceptionalNumber,
}: {
  status: number;
  setStatus: (n: number) => void;
  allNumber: number;
  pendingNumber: number;
  paidNumber: number;
  deliveredNumber: number;
  shippedNumber: number;
  receivedNumber: number;
  invalidNumber: number;
  exceptionalNumber: number;
}) => {
  return (
    <>
      <div className="flex gap-5 mt-5">
        <Button
          onClick={() => setStatus(0)}
          className={`${
            status === 0 && "bg-red-500 text-white"
          } text-base font-semibold`}
        >
          all <span className="mt-0 font-normal">{allNumber}</span>
        </Button>
        <Button
          onClick={() => setStatus(1)}
          className={`${
            status === 1 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          pending <span className="mt-0 font-normal">{pendingNumber}</span>
        </Button>
        <Button
          onClick={() => setStatus(2)}
          className={`${
            status === 2 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          paid <span className="mt-0 font-normal">{paidNumber}</span>
        </Button>
        <Button
          onClick={() => setStatus(3)}
          className={`${
            status === 3 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          delivered <span className="mt-0 font-normal">{deliveredNumber}</span>
        </Button>
        <Button
          onClick={() => setStatus(4)}
          className={`${
            status === 4 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          shipped <span className="mt-0 font-normal">{shippedNumber}</span>
        </Button>{" "}
        <Button
          onClick={() => setStatus(5)}
          className={`${
            status === 5 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          received <span className="mt-0 font-normal">{receivedNumber}</span>
        </Button>{" "}
        <Button
          onClick={() => setStatus(19)}
          className={`${
            status === 19 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          invalid <span className="mt-0 font-normal">{invalidNumber}</span>
        </Button>{" "}
        <Button
          onClick={() => setStatus(999)}
          className={`${
            status === 999 && "bg-red-500 text-white "
          } text-base font-semibold`}
        >
          exceptional{" "}
          <span className="mt-0 font-normal">{exceptionalNumber}</span>
        </Button>{" "}
      </div>
    </>
  );
};
