import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<Button type="primary">Back Home</Button>}
  />,
  document.getElementById('container'),
);