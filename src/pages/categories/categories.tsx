import { CategoriesHeader } from "./categoriesHeader/categoriesHeader";
import { CategoriesTable } from "./categoriesTable/categoriesTable";

export const Categories = () => {
  return (
    <>
      <CategoriesHeader />
      <div className="mt-10">
        <CategoriesTable />
      </div>
    </>
  );
};
