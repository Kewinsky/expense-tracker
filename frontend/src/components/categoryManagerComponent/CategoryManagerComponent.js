import { useContext, useEffect, useRef, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../App";
import UserService from "../../services/userService";
import {
  deserializeCategories,
  serializeCategories,
} from "../../helpers/categoriesMapper";
import { BsFillTrash2Fill, BsFillPlusCircleFill } from "react-icons/bs";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";

const CategoryManagerComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const form = useRef();

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getUserCategories = async () => {
    const response = await UserService.getUserCategories();

    const mappedCategories = deserializeCategories(response.data);

    setCategories(mappedCategories);
  };

  const handleOnAdd = () => {
    const updatedCategories = [...categories, ""];

    setCategories(updatedCategories);
  };

  const onChangeCategory = (index, newValue) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = newValue;
    setCategories(updatedCategories);
  };

  const handleOnDelete = (index) => {
    const updatedCategories = [...categories];

    updatedCategories.splice(index, 1);

    setCategories(updatedCategories);
  };

  const updatedUser = {
    categories: serializeCategories(categories),
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);
    setIsSubmitted(true);

    setTimeout(() => {
      UserService.updateCurrentUserCategories(updatedUser)
        .then(() => {
          setMessage("Categories updated successfully");
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
    getUserCategories();
  }, []);

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Modify your categories</Card.Header>
      <Form onSubmit={handleOnSubmit} ref={form} className="m-5">
        {categories.map((category, i) => (
          <Form.Group className="d-flex mb-3" key={i}>
            <Form.Control
              type="text"
              required
              value={category}
              onChange={(e) => onChangeCategory(i, e.target.value)}
              className={`${theme}Theme`}
              disabled={isSubmitted}
            />
            <Button
              variant="outline-danger"
              onClick={() => handleOnDelete(i)}
              disabled={isSubmitted}
            >
              <BsFillTrash2Fill size={20} />
            </Button>
          </Form.Group>
        ))}

        <Form.Group className="text-center">
          <Button
            variant={`outline-${reversedTheme}`}
            onClick={() => handleOnAdd()}
            disabled={isSubmitted}
          >
            <BsFillPlusCircleFill size={20} />
          </Button>
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
                href="/profile"
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
              <a href="/profile" className={`link-${reversedTheme} `}>
                Back
              </a>
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

export default CategoryManagerComponent;
