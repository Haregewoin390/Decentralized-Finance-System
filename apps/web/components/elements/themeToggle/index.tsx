'use client';
import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { setCookies } from 'cookies-next';
import { DarkBulbIcon, LightBulbIcon } from 'components/elements/icons';
import Button from 'components/elements/buttons';
import { useTheme } from 'utils/context/antdTheme';

import styles from './themeToggle.module.scss';

export default function ThemeToggle() {
  const { darkTheme, setDarkTheme } = useTheme();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    setDarkTheme(key == 'dark');
    setCookies('theme',key);
  };

  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: (
        <div>
          <LightBulbIcon />
          <span>light</span>
        </div>
      ),
    },
    {
      key: 'dark',
      label: (
        <div>
          <DarkBulbIcon />
          <span>dark</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      className={styles.container}
      menu={{
        items,
        selectable: true,
        selectedKeys: [darkTheme ? 'dark' : 'light'],
        onClick,
      }}
    >
      <Button
        className='btn'
        type='default'
        size='large'
        shape='circle'
        icon={darkTheme ? <DarkBulbIcon /> : <LightBulbIcon />}
      />
    </Dropdown>
  );
}
