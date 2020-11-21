import React from 'react';
import s from './EmptyContainer.module.scss';

const EmptyContainer = (): JSX.Element => {
  return <div className={s.container}>Выберите, кому хотели бы написать</div>;
};

export default EmptyContainer;
