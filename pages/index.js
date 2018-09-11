import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import Tabs from '../components/tabs/Tabs';
import { getDataStart } from '../store/actions/home/someData';
import { setNav } from '../store/actions/global/nav';

class Index extends Component {
  static async getInitialProps({ ctx }) {
    const { store, req } = ctx;
    store.dispatch(setNav({ navTitle: 'Home', isHome: true }));
    store.dispatch(getDataStart());
    const language = req ? req.headers['accept-language'] : navigator.language;

    return {
      language
    };
  }

  componentWillUnmount() {
    this.props.dispatch(setNav({ isHome: false }));
  }

  render() {
    const { language, pathname } = this.props;

    return (
      <Layout language={language}>
        <Tabs />
      </Layout>
    );
  }
}

export default connect()(Index);
