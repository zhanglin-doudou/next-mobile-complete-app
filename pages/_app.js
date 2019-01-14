import '../styles/base.scss';
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import { parseCookies } from 'nookies';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    let cookies = {};
    if (ctx.isServer) {
      cookies = parseCookies(ctx);
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx, cookies });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
