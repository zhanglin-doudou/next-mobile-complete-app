import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import { setNav } from '../store/actions/global/nav';

class Other extends Component {
  static getInitialProps({ ctx }) {
    const { store, req } = ctx;
    store.dispatch(setNav({ navTitle: 'Other' }));
    const language = req ? req.headers['accept-language'] : navigator.language;

    return {
      language
    };
  }

  render() {
    const { language } = this.props;

    return <Layout language={language}>other page</Layout>;
  }
}

export default connect()(Other);
