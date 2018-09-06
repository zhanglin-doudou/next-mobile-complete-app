import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { TabBar, Icon } from 'antd-mobile';
import TabHome from './TabHome';
import TabIcon from './TabIcon';
import TabTrick from './TabTrick';
import { setNavTitle } from '../../store/actions/global/nav';

const tabBarData = [
  {
    title: 'Home',
    icon: 'koubei-o',
    selectedIcon: 'koubei',
    link: '/home',
    component: TabHome
  },
  {
    title: 'Icon',
    icon: 'check-circle-o',
    selectedIcon: 'check-circle',
    link: '/icon',
    component: TabIcon
  },
  {
    title: 'Trick',
    icon: 'cross-circle-o',
    selectedIcon: 'cross-circle',
    link: '/trick',
    component: TabTrick
  }
];

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: '/home' };
  }

  render() {
    const { pathname, children } = this.props;

    return (
      <div className="main-tabs">
        <TabBar>
          {tabBarData.map(({ title, icon, selectedIcon, link, dot, component }) => {
            const Com = component;
            return (
              <TabBar.Item
                key={link}
                title={title}
                icon={<Icon type={icon} />}
                selectedIcon={<Icon type={selectedIcon} />}
                selected={this.state.selectedTab === link}
                onPress={() => {
                  this.props.dispatch(setNavTitle(title));
                  this.setState({
                    selectedTab: link
                  });
                }}
              >
                <Com />
              </TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}

export default connect()(Tabs);
