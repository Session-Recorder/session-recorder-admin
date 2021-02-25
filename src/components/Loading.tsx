import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Spin
      tip="로딩 중..."
      indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
    ></Spin>
  );
};

export default Loading;
