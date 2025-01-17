import { useState } from "react";
import { FilialsCards } from "./filialsCards/filialsCards";
import { FilialsHeader } from "./filialsHeader/filialsHeader";

export const Filials = () => {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  return (
    <>
      <FilialsHeader setDateFrom={setDateFrom} setDateTo={setDateTo} />
      <FilialsCards dateFrom={dateFrom} dateTo={dateTo} />
    </>
  );
};
