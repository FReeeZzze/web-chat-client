import React from 'react';
import { node } from 'prop-types';
import styles from './BaseLayout.module.scss';

const BaseLayout = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

BaseLayout.propTypes = {
  children: node,
};

export default BaseLayout;
