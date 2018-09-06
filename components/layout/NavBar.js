import { NavBar, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

class MenuBar extends Component {
  render() {
    const { pathname, children, navTitle } = this.props;

    return (
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />
        ]}
      >
        {navTitle}
      </NavBar>
    );
  }
}

const mapStateToProps = state => ({ navTitle: state.globalStore.nav.navTitle });
export default connect(mapStateToProps)(MenuBar);
