import { useState } from 'react';
import IconEyeClosed from '../../assets/svg/IconEyeClosed';
import IconEye from '../../assets/svg/IconEye';

export default function CustomInput({
  label,
  id,
  type = 'text',
  disabled = false,
  children,
  inputReference,
  containerClassName,
  labelClassName,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  type?: 'text' | 'password' | 'email' | 'color' | 'date' | 'datetime-local';
  disabled?: boolean;
  children?: React.ReactNode;
  inputReference?: React.Ref<HTMLInputElement>;
  containerClassName?: string;
  labelClassName?: string;
}) {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  return (
    <div
      className={`relative ${disabled && 'opacity-50'} ${containerClassName}`}
    >
      <label
        htmlFor={id}
        className={`absolute top-3 text-xs text-white/40 ${
          !labelClassName?.includes('left-') && 'left-3'
        } ${labelClassName}`}
      >
        {props.required && '*'} {label}
      </label>
      <input
        ref={inputReference}
        className='field'
        id={id}
        name={id}
        autoComplete='off'
        type={isShowingPassword ? 'text' : type}
        disabled={disabled}
        {...props}
      />
      {type === 'password' && (
        <button
          className='absolute right-3 top-1/2 -translate-y-1/2 [&>*]:pointer-events-none'
          onClick={() => setIsShowingPassword(!isShowingPassword)}
          tabIndex={-1}
          type='button'
        >
          {isShowingPassword ? <IconEyeClosed /> : <IconEye />}
        </button>
      )}
      {children}
    </div>
  );
}
