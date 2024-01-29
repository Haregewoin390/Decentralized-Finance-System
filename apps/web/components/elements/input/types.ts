import { InputHTMLAttributes } from 'react';

export default interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error: boolean;
  inputType: 'password' | 'text';
}
