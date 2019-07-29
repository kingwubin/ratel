import React from 'react';
import PropTypes from 'prop-types';
import style from './MenuBase.less';

export default function Item(props) {
  function MarkBackgroundStyle(url) {
    return {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
    };
  }

  const { name, description, imageUrl } = props;

  return (
    <ul className={style.item}>
      <li>
        <div>
          <label>
            {name}
            dsds
          </label>
          <label>
            {description}
          </label>
        </div>
      </li>
      <li>
        <div style={MarkBackgroundStyle(imageUrl)} />
        <label>
          {name}
        </label>
      </li>
    </ul>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
