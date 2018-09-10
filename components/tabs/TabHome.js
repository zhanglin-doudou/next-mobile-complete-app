import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

class TabHome extends Component {
  render() {
    return (
      <div>
        <Link href="/other">to other page</Link>
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
