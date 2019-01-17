import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import Tabs from '../components/tabs/Tabs';
import { getDataStart } from '../store/actions/home/someData';
import { setNav } from '../store/actions/global/nav';

class Index extends Component {
  static async getInitialProps({ ctx }) {
    const { store, isServer, cookies } = ctx;
    store.dispatch(setNav({ navTitle: 'Home', isHome: true }));
    store.dispatch(getDataStart({ settings: { isServer, cookies } }));
  }

  componentWillUnmount() {
    this.props.dispatch(setNav({ isHome: false }));
  }

  render() {
    return (
      <Layout>
        <Tabs />
      </Layout>
    );
  }
}

export default connect()(Index);
