import React, { Component } from 'react';
import { Result, Button } from 'antd';

interface IState {
  hasError?: Boolean;
  info?: string;
  eventId?: string;
}

class ErrorPage extends Component<IState> {
  state = { hasError: false, info: '', eventId: '' };

  render() {
    return (
      <Result
        status="500"
        title="500"
        subTitle={this.state.info}
        extra={<Button type="primary">Report feedback</Button>}
      />
    )
  }
}

export default ErrorPage;