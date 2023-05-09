import React from "react";
import { Form } from "react-bootstrap";

const ThemeModeComponent = ({ theme, handleToggleSwitch }) => {
  const isDark = theme === "dark" ? true : false;
  return (
    <Form.Check
      type="switch"
      label="Dark Mode"
      onChange={handleToggleSwitch}
      checked={isDark}
    />
  );
};

export default ThemeModeComponent;
