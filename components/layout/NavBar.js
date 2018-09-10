import { NavBar, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MenuBar extends Component {
  render() {
    const { nav } = this.props;

    let leftContent = nav.canGoBack ? <Icon type="left" /> : null;
    let rightContent;
    let onLeftClick = () => {
      if (nav.canGoBack) {
        window.history.back();
      }
    };
    if (nav.isHome) {
      leftContent = <Icon type="search" />;
      rightContent = [<Icon key="1" type="ellipsis" />];
    }

    return (
      <NavBar mode="light" icon={leftContent} onLeftClick={onLeftClick} rightContent={rightContent}>
        {nav.navTitle}
      </NavBar>
    );
  }
}

const mapStateToProps = state => ({ nav: state.globalStore.nav });
export default connect(mapStateToProps)(MenuBar);
