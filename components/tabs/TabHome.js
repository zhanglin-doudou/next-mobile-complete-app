import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button } from 'antd-mobile';
import { getDataStart } from '../../store/actions/home/someData';

class TabHome extends Component {
  requestData() {
    this.props.dispatch(getDataStart());
  }
  render() {
    return (
      <div>
        <Link href="/scroll-page">
          <Button type="primary">to scroll page</Button>
        </Link>
        <Link href="/flex-page">
          <Button>to flex page</Button>
        </Link>
        <Button onClick={() => this.requestData()}>client request</Button>
        <div>test input:</div>
        <h3>Server Initial Data -----></h3>
        <div style={{ overflowX: 'scroll' }}>
          {this.props.someData.length > 0 && (
            <pre>
              <code>{JSON.stringify(this.props.someData, null, 2)}</code>
            </pre>
          )}
          {this.props.error && <p style={{ color: 'red' }}>Error: {this.props.error.message}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ someData: state.homeStore.someData });
export default connect(mapStateToProps)(TabHome);
