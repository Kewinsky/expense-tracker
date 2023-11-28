import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ThemeContext } from "../../App";
import { reloadData } from "../../helpers/reloadData";
import {
  errorNotification,
  successNotification,
} from "../../helpers/toastNotifications";
import AuthService from "../../services/authService";
import CategoryService from "../../services/categoryService";

const AddCategoryComponent = ({ setCategories }) => {
  const { theme } = useContext(ThemeContext);
  const currentUser = AuthService.getCurrentUser();

  const [title, setTitle] = useState("");

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const newCategory = {
    title,
    user: {
      id: currentUser.id,
    },
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    setTitle("");

    CategoryService.addCategory(newCategory)
      .then((res) => {
        successNotification(res);
      })
      .then(() => {
        reloadData(CategoryService.getCategoriesByUser, setCategories);
      })
      .catch((err) => {
        errorNotification(err.message);
      });
  };

  return (
    <Container className="my-3">
      <Form onSubmit={handleAddCategory}>
        <Row className="align-items-end" xs={1} md={2} lg={4}>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Category Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Other"
                value={title}
                onChange={handleInputTitle}
                className={`${theme}Theme`}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Add
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCategoryComponent;
