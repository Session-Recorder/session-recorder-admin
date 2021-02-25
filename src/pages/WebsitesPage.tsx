import {
  Button,
  Col,
  Divider,
  message,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";
import CLayout from "components/CLayout";
import AxiosClient, { fetcher } from "fetchers/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export interface ILoadStatus {
  loaded?: boolean;
  error?: boolean;
}

const WebsitesPage: React.FC = () => {
  const { data: websites, error, mutate } = useSWR("/api/websites", fetcher);
  if (error) return null;
  return (
    <CLayout path={['웹사이트 관리', '목록']}>
      <Typography>
        <Title>웹사이트 목록</Title>
      </Typography>
      <Row justify="end" style={{ marginBottom: 20 }}>
        <Col>
          <Button size="middle" href="/websites-new">
            <b>새로운 웹사이트 등록</b>
          </Button>
        </Col>
      </Row>
      <Table
        loading={!websites}
        columns={[
          { title: "ID", dataIndex: "_id" },
          { title: "이름", dataIndex: "name" },
          {
            title: "도메인",
            dataIndex: "domain",
            render(text, record) {
              return <a href={text}>{text}</a>;
            },
          },
          {
            title: "액션",
            dataIndex: "action",
            render(text, record) {
              return (
                <Space size="middle">
                  <Button type="primary" href={`/websites/${record._id}`}>
                    상세보기
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      const sure = window.confirm("정말로 삭제하시겠습니까?");
                      if (sure) {
                        AxiosClient.delete(`/api/websites/${record._id}`)
                          .then(() => {
                            message.success("성공적으로 삭제되었습니다");
                            mutate();
                          })
                          .catch(() => {
                            message.error("알 수 없는 오류가 발생했습니다");
                            console.log("error");
                          });
                      }
                    }}
                  >
                    삭제하기
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={websites}
      />
      <Divider />
    </CLayout>
  );
};

export default WebsitesPage;
