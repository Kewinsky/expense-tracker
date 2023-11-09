import { useEffect, useState } from "react";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import { updateCategoryURL } from "../../utils/updateURL";
import CategoryService from "../../services/categoryService";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import { categoriesTableHeaders } from "../../utils/tableHeaders";
import AddCategoryComponent from "../../components/addComponent/AddCategoryComponent";
import HeaderComponent from "../../components/headerComponent/HeaderComponent";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  console.log("dupa");

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
      <HeaderComponent header={"Manage Categories"} />
      <SeparatorComponent />
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

export default CategoriesPage;
