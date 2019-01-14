import React, { Component, Fragment } from 'react';
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import NavBar from './NavBar';

export default class Layout extends Component {
  render() {
    const { language, children, style, className = '', bottom } = this.props;
    const locale = language && language.substr(0, 2) === 'en' ? enUS : undefined;

    return (
      <LocaleProvider locale={locale}>
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
      </LocaleProvider>
    );
  }
}
