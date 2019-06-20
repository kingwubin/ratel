import React from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';
import MenuData from './MenuData';
import style from './MenuBase.less';

function MenuBase() {
  return (
    <section className={style.menu}>
      <ul className={style.james}>
        {MenuData.map((item) => {
          const {
            name,
            description,
            path,
            imageUrl,
          } = item;
          return (
            <li>
              <Link to={path}>
                <Item name={name} description={description} imageUrl={imageUrl} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default MenuBase;
