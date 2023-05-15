import Select from "react-select";
import { dropdownData } from "../../helpers/dropdownData";

const SelectComponent = ({
  options,
  handleSelect,
  placeholder,
  theme,
  defaultValue,
  isMulti,
  closeMenuOnSelect,
}) => {
  const darkMode =
    theme === "darkTheme"
      ? {
          singleValue: (provided) => ({
            ...provided,
            color: "#fff",
          }),
          control: (base) => ({
            ...base,
            background: "#212529",
            color: "#fff",
          }),
          menu: (base) => ({
            ...base,
            background: "#212529",
          }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            console.log({ data, isDisabled, isFocused, isSelected });
            return {
              ...styles,
              backgroundColor: isFocused ? "#323539" : null,
              color: "#fff",
            };
          },
          multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: "#323539",
            };
          },
          multiValueLabel: (styles) => ({
            ...styles,
            color: "#fff",
          }),
        }
      : "";

  return (
    <Select
      options={dropdownData(options)}
      onChange={handleSelect}
      placeholder={placeholder}
      styles={darkMode}
      defaultValue={defaultValue}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default SelectComponent;
