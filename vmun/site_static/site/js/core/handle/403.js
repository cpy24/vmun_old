import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />,
  document.getElementById('container'),
);