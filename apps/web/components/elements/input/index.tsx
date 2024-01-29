'use client';
import { useState } from 'react';
import { EyeIcon, EyeInvisibleIcon } from 'components/elements/icons';
import InputProps from './types';

import styles from './input.module.scss';

export default function Input({
  label,
  error,
  inputType,
  ...rest
}: InputProps): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const makePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={rest.id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.row}>
        {inputType === 'password' ? (
          <input
            className={styles.inputField}
            type={passwordVisible ? 'text' : 'password'}
            {...rest}
          />
        ) : (
          <input className={styles.inputField} {...rest} />
        )}
        {inputType === 'password' && (
          <button
            className={styles.showPassword}
            onClick={makePasswordVisible}
            type={'button'}
          >
            {passwordVisible ? <EyeIcon /> : <EyeInvisibleIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
