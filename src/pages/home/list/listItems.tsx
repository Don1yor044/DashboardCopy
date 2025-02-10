/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Table } from "antd";
import { useState } from "react";
import { IDashboards } from "../../../types/types";
import { ListColumns } from "./listColumns/listColumns";
import { ListDrawer } from "./listDrawer/listDrawer";

export const ListItems = ({
  dataCourse,
  isSelected,
  onSelect,
  setUserId,
  fetchData,
}: {
  dataCourse: IDashboards[];
  isSelected: number[];
  onSelect: (id: number) => void;
  setUserId: (id: number) => void;
  fetchData: () => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<IDashboards | null>(null);
  const [open, setOpen] = useState(false);

  const rowClassName = (record: IDashboards) => {
    return isSelected.includes(record.id) ? "!bg-green-500 text-white" : "";
  };

  const showDrawer = (record: IDashboards) => {
    setSelectedUser(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mt-5" css={noHoverStyle}>
      <Table
        dataSource={dataCourse.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
        columns={ListColumns(isSelected, onSelect, setUserId, showDrawer)[0]}
        pagination={false}
        className="shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-t-xl"
        rowClassName={rowClassName}
        scroll={{ x: 3100 }}
      />
      <ListDrawer
        open={open}
        onClose={onClose}
        selectedUser={selectedUser}
        fetchData={fetchData}
      />
    </div>
  );
};
const noHoverStyle = css`
  .ant-table-cell-row-hover {
    background: none !important;
  }
`;
