import React, { Component } from 'react';

export default ({ type, className = '', size = 'md', ...restProps }) => {
  return (
    <svg className={`am-icon am-icon-${type.default.id.substr(1)} am-icon-${size} ${className}`} {...restProps}>
      <use xlinkHref={`#${type.default.id}`} />
    </svg>
  );
};
