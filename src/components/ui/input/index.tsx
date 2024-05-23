import styles from "./Input.module.scss";

type Propstypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
};

const Input = (props: Propstypes) => {
  const { label, name, type, placeholder, defaultValue, disabled, onChange } =
    props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__input}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
