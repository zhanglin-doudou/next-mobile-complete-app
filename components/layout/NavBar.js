import { NavBar, Icon, Popover } from 'antd-mobile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
const Item = Popover.Item;

const myImg = src => (
  <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />
);
class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false
    };
  }
  componentDidMount() {
    Router.router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  handleRouteChange = url => {
    if (window && window.history.length > 0) {
      !this.setState.canGoBack && this.setState({ canGoBack: true });
    } else {
      this.setState.canGoBack && this.setState({ canGoBack: false });
    }
  };

  render() {
    const { nav } = this.props;

    let leftContent = this.state.canGoBack ? <Icon type="left" /> : null;
    let rightContent;
    let onLeftClick = () => {
      if (this.state.canGoBack) {
        window.history.back();
      }
    };
    if (nav.isHome) {
      leftContent = <Icon type="search" />;
      onLeftClick = () => {
        console.log('search click');
      };
      rightContent = (
        <Popover
          mask
          overlayClassName="fortest"
          overlayStyle={{ color: 'currentColor' }}
          visible={this.state.visible}
          overlay={[
            <Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">
              Scan
            </Item>,
            <Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>
              My Qrcode
            </Item>,
            <Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
              <span style={{ marginRight: 5 }}>Help</span>
            </Item>
          ]}
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 0]
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div
            style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
      );
    }

    return (
      <NavBar mode="light" icon={leftContent} onLeftClick={onLeftClick} rightContent={rightContent}>
        {nav.navTitle}
      </NavBar>
    );
  }
}

const mapStateToProps = state => ({ nav: state.globalStore.nav });
export default connect(mapStateToProps)(withRouter(MenuBar));
