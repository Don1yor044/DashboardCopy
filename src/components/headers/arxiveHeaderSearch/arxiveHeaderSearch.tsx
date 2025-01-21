import { Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { LuSearch } from "react-icons/lu";
import { observer } from "mobx-react-lite";
import searchStore from "../../../store/searchStore";

export const ArxiveHeaderSearch = observer(() => {
  const handleChange = (event: string) => {
    searchStore.setSearchArxive(event);
  };

  return (
    <>
      <Header
        style={{ padding: "0px 40px 15px 15px", background: "#FAFBFF " }}
        className="h-28 flex items-end justify-between gap-5 "
      >
        <div className="bg-white flex gap-2 items-center rounded-full w-full mb-1 h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <LuSearch size={25} color="#FE5222" />
          <Input
            allowClear
            placeholder="Arxivdan qidiruv..."
            value={searchStore.searchArxive}
            onChange={(e) => handleChange(e.target.value)}
            className="border-none text-xl"
          />
        </div>
      </Header>
    </>
  );
});
