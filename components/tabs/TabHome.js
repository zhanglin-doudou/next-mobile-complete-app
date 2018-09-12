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
        <Link href="/other">
          <a>to other page</a>
        </Link>
        <Button onClick={() => this.requestData()}>client request</Button>
        <h3>Server Initial Data -----></h3>
        {this.props.someData.length > 0 && (
          <pre>
            <code>{JSON.stringify(this.props.someData, null, 2)}}</code>
          </pre>
        )}
        {this.props.error && <p style={{ color: 'red' }}>Error: {this.props.error.message}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({ someData: state.homeStore.someData });
export default connect(mapStateToProps)(TabHome);
