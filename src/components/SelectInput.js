import Select from "react-select";

const SelectInput = ({
  onChange,
  options,
  className,
  placeholder,
  isLoading,
}) => {
  const detailStyle = {
    control: (styles) => ({ ...styles, borderRadius: "0px" }),
  };
  return (
    <div className={`input ${className}`}>
      <Select
        className={`${isLoading ? "skeleton" : ""}`}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        value={isLoading ? null : options.value}
        noOptionsMessage={() => "Não há opções disponíveis"}
        isDisabled={options.length ? false : true}
        styles={detailStyle}
      />
    </div>
  );
};

export default SelectInput;
