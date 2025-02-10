import { useState } from "react";
import { FilialsCards } from "./filialsCards/filialsCards";
import { FilialsHeader } from "./filialsHeader/filialsHeader";
import dayjs, { Dayjs } from "dayjs";

export const Filials = () => {
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(
    dayjs().startOf("day")
  );

  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs().endOf("day"));

  return (
    <>
      <FilialsHeader setDateFrom={setDateFrom} setDateTo={setDateTo} />
      <FilialsCards
        dateFrom={dateFrom?.format("YYYY-MM-DD HH:mm:ss")}
        dateTo={dateTo?.format("YYYY-MM-DD HH:mm:ss")}
      />
    </>
  );
};
