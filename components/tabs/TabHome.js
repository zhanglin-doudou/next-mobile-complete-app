import React, { Component } from 'react';
import { connect } from 'react-redux';

class TabHome extends Component {
  render() {
    console.log(this.props.someData);

    return (
      <div>
        {this.props.someData.length > 0 && (
          <pre>
            <code>{this.props.someData.map(item => item.id)}</code>
          </pre>
        )}
        {this.props.error && <p style={{ color: 'red' }}>Error: {this.props.error.message}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({ someData: state.homeStore.someData });
export default connect(mapStateToProps)(TabHome);
