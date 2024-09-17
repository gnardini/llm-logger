import React from 'react';

interface InputProps {
  id?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  disabled,
  required = false,
  readOnly,
  onClick,
  className,
}) => (
  <input
    type={type}
    id={id}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    required={required}
    disabled={disabled}
    readOnly={readOnly}
    onClick={onClick}
    className={`w-full py-1 px-1 bg-tertiary-background text-text-primary rounded-md border-2 border-transparent focus:border-primary-accent focus:outline-none shadow-sm ${className || ''}`}
  />
);