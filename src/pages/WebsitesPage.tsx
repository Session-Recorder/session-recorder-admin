import { Button, Col, Divider, Row, Space, Table, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import CLayout from "components/CLayout";
import React from "react";

const WebsitesPage: React.FC = () => {
  return (
    <CLayout>
      <Typography>
        <Title>웹사이트 목록</Title>
      </Typography>
      <Row justify="end">
        <Col>
          <Button>새로운 웹사이트 등록</Button>
        </Col>
      </Row>
      <Table
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "이름", dataIndex: "name" },
          {
            title: "도메인",
            dataIndex: "domain",
            render(text, record) {
              return <a href={text}>{text}</a>;
            },
          },
          { title: "세션 수", dataIndex: "sessionCount" },
          {
            title: "액션",
            dataIndex: "action",
            render(text, record) {
              return (
                <Space size="middle">
                  <Button type="primary">세션보기</Button>
                  <Button>수정하기</Button>
                  <Button danger>삭제하기</Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={[
          {
            id: 1,
            name: 123,
            domain: "https://www.google.com/",
            sessionCount: 5,
          },
        ]}
      />
      <Divider />
    </CLayout>
  );
};

export default WebsitesPage;
