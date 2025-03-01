import { ColumnProps } from "antd/es/table";
import { IfiltersData } from "../../../../types/types";
import { CiEdit } from "react-icons/ci";
import { Button } from "antd";
import { Dispatch, SetStateAction } from "react";
const UserRole = localStorage.getItem("Role");

export const FiltersListsColumns = (
  activeButton: string,
  setOpen: Dispatch<React.SetStateAction<boolean>>,
  setItemId: Dispatch<SetStateAction<string | number | null>>
): ColumnProps<IfiltersData>[] => {
  const handleButtonClick = (userId: string | number) => {
    setItemId(userId);
    setOpen(true);
  };
  if (
    activeButton === "region" ||
    activeButton === "asc" ||
    activeButton === "desc"
  ) {
    return [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        className: "text-base border-e w-10",
        render: (_: string, __: IfiltersData, index: number) => index + 1,
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">User_id</span>
        ),
        dataIndex: "user_id",
        key: "user_id",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Ism</span>
        ),
        dataIndex: "full_name",
        key: "full_name",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Manzil</span>
        ),
        dataIndex: "address",
        key: "address",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Shahar</span>
        ),
        dataIndex: "city",
        key: "city",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">
            Xarid vaqti
          </span>
        ),
        dataIndex: "purchase_time",
        key: "purchase_time",
        className: "text-base border-e  text-center ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">
            Kelgan vaqti
          </span>
        ),
        dataIndex: "created_at",
        key: "created_at",
        className: "text-base border-e  text-center ",
        render: (text: string) => {
          if (!text) return "-";
          const date = new Date(text);
          const formattedDate = date
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          return formattedDate;
        },
      },
    ];
  } else if (activeButton === "user") {
    return [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        className: "text-base border-e w-10",
        render: (_: string, __: IfiltersData, index: number) => index + 1,
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">Action</span>
        ),
        dataIndex: "user_id",
        key: "user_id",
        className: "text-base border-e !w-10",
        render: (_: string, record: IfiltersData) => (
          <Button
            className="bg-[#1677ff] text-white rounded-lg p-2 cursor-pointer"
            onClick={() => handleButtonClick(record.user_id)}
            disabled={UserRole === "30" && true}
          >
            <CiEdit size={23} />
          </Button>
        ),
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">User_id</span>
        ),
        dataIndex: "user_id",
        key: "user_id",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Ism</span>
        ),
        dataIndex: "full_name",
        key: "full_name",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">
            Telefon raqam
          </span>
        ),
        dataIndex: "phone",
        key: "phone",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Manzil</span>
        ),
        dataIndex: "address",
        key: "address",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Shahar</span>
        ),
        dataIndex: "city",
        key: "city",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">To'lov</span>
        ),
        dataIndex: "payment_fees",
        key: "payment_fees",
        className: "text-base border-e text-center",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">Comment</span>
        ),
        dataIndex: "comment",
        key: "comment",
        className: "text-base border-e",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">Soni</span>
        ),
        dataIndex: "count",
        key: "count",
        className: "text-base border-e",
      },
    ];
  } else if (activeButton === "payme") {
    return [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        className: "text-base border-e w-10",
        render: (_: string, __: IfiltersData, index: number) => index + 1,
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">User_id</span>
        ),
        dataIndex: "user_id",
        key: "user_id",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Ism</span>
        ),
        dataIndex: "full_name",
        key: "full_name",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Manzil</span>
        ),
        dataIndex: "address",
        key: "address",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Shahar</span>
        ),
        dataIndex: "city",
        key: "city",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">To'lov</span>
        ),
        dataIndex: "payment_fees",
        key: "payment_fees",
        className: "text-base border-e",
      },
    ];
  } else if (activeButton === "count") {
    return [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        className: "text-base border-e w-10",
        render: (_: string, __: IfiltersData, index: number) => index + 1,
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">User_id</span>
        ),
        dataIndex: "user_id",
        key: "user_id",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Ism</span>
        ),
        dataIndex: "full_name",
        key: "full_name",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Manzil</span>
        ),
        dataIndex: "address",
        key: "address",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Shahar</span>
        ),
        dataIndex: "city",
        key: "city",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">Sanog'i</span>
        ),
        dataIndex: "express_nums",
        key: "express_nums",
        className: "text-base border-e",
      },
    ];
  } else if (activeButton === "dateRage") {
    return [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        className: "text-base border-e w-10",
        render: (_: string, __: IfiltersData, index: number) => index + 1,
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">User_id</span>
        ),
        dataIndex: "user_id",
        key: "user_id",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Ism</span>
        ),
        dataIndex: "full_name",
        key: "full_name",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">
            Telefon raqam
          </span>
        ),
        dataIndex: "phone",
        key: "phone",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Manzil</span>
        ),
        dataIndex: "address",
        key: "address",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500 ">Shahar</span>
        ),
        dataIndex: "city",
        key: "city",
        className: "text-base border-e ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">
            Xarid vaqti
          </span>
        ),
        dataIndex: "purchase_time",
        key: "purchase_time",
        className: "text-base border-e  text-center ",
      },
      {
        title: (
          <span className="text-lg font-semibold text-gray-500">
            Kelgan vaqti
          </span>
        ),
        dataIndex: "created_at",
        key: "created_at",
        className: "text-base border-e  text-center ",
        render: (text: string) => {
          if (!text) return "-";
          const date = new Date(text);
          const formattedDate = date
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          return formattedDate;
        },
      },
    ];
  }
  return [];
};
