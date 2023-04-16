import React, { useState, useEffect } from "react";
import UserService from "../../services/userService";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      () => {
        navigate("/unauthorized");
      }
    );
  }, []);
  return <div>{content}</div>;
};

export default AdminPage;
