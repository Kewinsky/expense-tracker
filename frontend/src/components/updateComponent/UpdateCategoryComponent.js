import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../App";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import Form from "react-bootstrap/Form";
import CategoryService from "../../services/categoryService";

const UpdateCategoryComponent = ({ categories }) => {
  const { id: categoryId } = useParams();

  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const selectedCategory = categories.find((item) => {
    return item.id === parseInt(categoryId);
  });

  const [title, setTitle] = useState(selectedCategory?.title);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const updatedCategory = {
    title,
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      CategoryService.updateCategory(categoryId, updatedCategory)
        .then(() => {
          setMessage("Category updated successfully");
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    }, 1000);
  };

  useEffect(() => {
    if (selectedCategory) {
      setTitle(selectedCategory.title);
    }
  }, [selectedCategory]);

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Update Category</Card.Header>
      <Form onSubmit={handleUpdateCategory} className="m-5">
        <Form.Group className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleInputTitle}
            value={title || ""}
            type="text"
            className={`${theme}Theme`}
          />
        </Form.Group>

        <Form.Group className="mt-5">
          {isPending && <SpinnerComponent />}
          {!isPending && !message && (
            <>
              <Button variant="success" type="submit" className="w-100">
                Submit
              </Button>
              <Button
                variant={`outline-${reversedTheme}`}
                type="submit"
                className="w-100 mt-2"
                href="/userCategories"
              >
                Cancel
              </Button>
            </>
          )}
        </Form.Group>

        {message && (
          <Form.Group className="mt-5">
            <div className="alert alert-success m-0" role="alert">
              {message}
            </div>
            <div className="mt-5 text-center">
              <Link to={"/userCategories"} className={`link-${reversedTheme} `}>
                Back
              </Link>
            </div>
          </Form.Group>
        )}

        {error && (
          <Form.Group className="mt-5">
            <div className="alert alert-danger m-0" role="alert">
              {error}
            </div>
          </Form.Group>
        )}
      </Form>
    </Card>
  );
};

export default UpdateCategoryComponent;
