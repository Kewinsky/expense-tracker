import { useEffect, useState } from "react";
import UpdateCategoryComponent from "../../components/updateComponents/UpdateCategoryComponent";
import CategoryService from "../../services/categoryService";
import SimplePage from "../simplePage/SimplePage";

const UpdateCategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await CategoryService.getCategoriesByUser();

    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <SimplePage>
      <UpdateCategoryComponent categories={categories} />
    </SimplePage>
  );
};

export default UpdateCategoryPage;
