import React from 'react';
import styles from './BaseLayout.module.scss';

const BaseLayout: React.FC = ({ children }): JSX.Element => {
  return <main className={styles.main}>{children}</main>;
};

export default BaseLayout;
