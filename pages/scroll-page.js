import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import { setNav } from '../store/actions/global/nav';
import { Button } from 'antd-mobile';
import './scroll-page.scss';

/* 
  这种page适用于所有平铺以及有底部button的页面
*/

class ScrollPage extends Component {
  static getInitialProps({ ctx }) {
    const { store } = ctx;
    store.dispatch(setNav({ navTitle: 'scroll page' }));
  }

  render() {
    return (
      <Layout
        className="scroll-page"
        bottom={
          <div className="fixed-bottom">
            <Button>底部按钮</Button>
          </div>
        }
      >
        <div style={{ height: '100vh', border: '3px solid' }}>info 1</div>
        <div style={{ height: '100vh', border: '3px solid' }}>info 2</div>
      </Layout>
    );
  }
}

export default connect()(ScrollPage);
