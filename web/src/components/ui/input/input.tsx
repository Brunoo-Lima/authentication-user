import { FieldError } from 'react-hook-form';
import s from './input.module.css';

interface IRootProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  classNameCustom?: string;
}

export const Root = ({ children, classNameCustom }: IRootProps) => {
  return (
    <div className={`${s.input__container} ${classNameCustom}`}>{children}</div>
  );
};

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  classNameCustom?: string;
}

export const Label = ({ classNameCustom, ...props }: ILabelProps) => {
  return <label className={`${s.label} ${classNameCustom}`} {...props} />;
};

interface IFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameCustom?: string;
}

export const FormField = ({ classNameCustom, ...props }: IFormFieldProps) => {
  return (
    <input className={`${s.input__field} ${classNameCustom}`} {...props} />
  );
};

interface IErrorMessageProps {
  message: string | FieldError | undefined;
  classNameCustom?: string;
}

export const ErrorMessage = ({
  classNameCustom,
  message,
}: IErrorMessageProps) => {
  return (
    <small className={`${s.error} ${classNameCustom}`}>
      {message as string}
    </small>
  );
};

interface IIconProps {
  children: React.ReactNode;
  classNameCustom?: string;
}
export const Icon = ({ children, classNameCustom }: IIconProps) => {
  return <span className={classNameCustom}>{children}</span>;
};
