import { useEffect, useState } from "react";
import UpdateCategoryComponent from "../../components/updateComponent/UpdateCategoryComponent";
import CategoryService from "../../services/categoryService";

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
    <div className="d-flex justify-content-center">
      <div className="m-3 set-width">
        <UpdateCategoryComponent categories={categories} />
      </div>
    </div>
  );
};

export default UpdateCategoryPage;
