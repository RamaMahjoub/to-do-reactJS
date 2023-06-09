import { Fragment, FC } from "react";

interface Props {
  options: any;
  handleChange?: any;
}
const RadioInputGroup: FC<Props> = ({ options, handleChange }) => {
  return (
    <div>
      {options.map((option: any) => (
        <Fragment key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={option.name}
            value={option.value}
            checked={option.checked}
            disabled={option.disabled}
            defaultChecked={option.defaultChecked}
            onChange={handleChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
          <br />
        </Fragment>
      ))}
    </div>
  );
};

export default RadioInputGroup;
