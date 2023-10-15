import Select from "react-select";

const SelectComponent = ({
  options,
  handleSelect,
  placeholder,
  theme,
  value,
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
          option: (styles, { isFocused }) => {
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
      options={options}
      onChange={handleSelect}
      placeholder={placeholder}
      styles={darkMode}
      value={value}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default SelectComponent;
