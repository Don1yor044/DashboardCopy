import { FiPhone } from "react-icons/fi";

export const CardsLi = ({ items }: { items: any }) => {
  return (
    <>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.id}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.full_name}
      </li>{" "}
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.phone}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.address}
      </li>{" "}
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.city}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.weight}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.status}
      </li>{" "}
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.express_num}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.payment_fee}
      </li>{" "}
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.user_id}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.order_id}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.express_line}
      </li>{" "}
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.platform_sku}
      </li>
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.purchase_time}
      </li>{" "}
      <li className="px-4 py-1 border-b border-gray-200 flex gap-3 items-center font-medium">
        <div className="bg-[#FE5222] text-white rounded-full p-[5px]">
          <FiPhone />
        </div>
        {items.quantity}
      </li>
    </>
  );
};
