import { useEffect, useState } from "react";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import { updateCategoryURL } from "../../helpers/updateURL";
import CategoryService from "../../services/categoryService";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import { categoriesTableHeaders } from "../../helpers/tableHeaders";
import AddCategoryComponent from "../../components/addComponent/AddCategoryComponent";

const UserCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    const response = await CategoryService.getCategoriesByUser();

    setError(null);
    setCategories(response.data);

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  };

  const handleDelete = useDeleteItem(
    CategoryService.deleteCategory,
    CategoryService.getCategoriesByUser,
    setCategories
  );

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <AddCategoryComponent
        categories={categories}
        setCategories={setCategories}
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={updateCategoryURL}
        handleDelete={handleDelete}
        configLabels={categoriesTableHeaders}
        records={categories}
        setRecords={setCategories}
        isPending={isPending}
        error={error}
      />
    </>
  );
};

export default UserCategoriesPage;
