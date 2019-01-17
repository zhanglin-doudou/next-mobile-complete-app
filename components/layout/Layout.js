import React, { Component, Fragment } from 'react';
import NavBar from './NavBar';

export default class Layout extends Component {
  render() {
    const { children, style, className = '', bottom } = this.props;

    return (
      <Fragment>
        <div className="main-nav">
          <NavBar />
        </div>
        <div className={'main-content ' + className} style={style}>
          {children}
          <div className="safe-area" />
        </div>
        {bottom}
      </Fragment>
    );
  }
}
