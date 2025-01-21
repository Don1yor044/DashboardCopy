// paginationStyles.ts
import { css } from "@emotion/react";

export const paginationStyle = css`
  .ant-pagination-item {
    background-color: white;
    color: #000;
  }
  .ant-pagination-item-active {
    background-color: #fe5222 !important;
    color: white !important;
    border: none !important;
    outline: none !important;
  }
  .ant-pagination-item-active a {
    color: white !important;
  }
  .ant-pagination-item:hover {
    background-color: #ffecdc;
    color: #fe5222;
  }
`;
