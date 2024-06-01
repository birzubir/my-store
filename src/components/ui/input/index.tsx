import styles from "./Input.module.scss";

type Propstypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Input = (props: Propstypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label className={styles.container__label} htmlFor={name}>
          {label}
        </label>
      )}
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
