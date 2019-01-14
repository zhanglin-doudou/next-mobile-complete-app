import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import { setNav } from '../store/actions/global/nav';

/* 
  这个page demo适用于需要整屏显示且自适应的页面
*/
class FlexPage extends Component {
  static getInitialProps({ ctx }) {
    const { store } = ctx;
    store.dispatch(setNav({ navTitle: 'flex page' }));
  }

  render() {
    return (
      <Layout className="col">
        <div style={{ flex: 1 }}>other info</div>
        <div style={{ height: '200px', overflow: 'auto', border: '1px solid red' }}>
          <div style={{ height: '500px' }}>inner scroll</div>
        </div>
      </Layout>
    );
  }
}

export default connect()(FlexPage);
