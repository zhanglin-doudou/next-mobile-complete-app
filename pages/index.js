import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import Tabs from '../components/tabs/Tabs';
import { getDataStart } from '../store/actions/home/someData';

class Index extends Component {
  static async getInitialProps({ req, ctx }) {
    const { store, isServer } = ctx;
    console.log(isServer);

    store.dispatch(getDataStart());
    const language = req && req.headers['accept-language'];

    return {
      language
    };
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
