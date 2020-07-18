import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />,
  document.getElementById('container'),
);