import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  Col,
  Row,
  Statistic,
  message,
  Input,
  Form,
  Space,
  Table,
  Button,
  Typography,
  Spin,
  Tooltip,
  Badge,
  Tag,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import CLayout from "components/CLayout";
import AxiosClient, { fetcher } from "fetchers/client";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import dateFormat from "dateformat";
import geoip from "geoip-country";

const { Title } = Typography;

export interface IWebsite {
  id: string;
  name: string;
  domain: string;
  description: string;
  sessions: string[];
}

export interface ISession {
  _id: string;
  websiteId: string;
  ip: string;
  createdAt: number;
  geoLocation: IGeoLocation;
}

interface IGeoLocation {
  country: string;
  range: number[];
}

function WebsitePage() {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectRowKeys] = useState([]);
  const {
    data: website,
    error: websiteError,
    mutate: mutateWebsite,
  } = useSWR<IWebsite>(`/api/websites/${id}`, fetcher);
  const {
    data: sessions,
    error: sessionsError,
    mutate: mutateSessions,
  } = useSWR<ISession[]>(`/api/sessions?websiteId=${id}`, fetcher);
  const {
    data: insertCode,
    error: insertCodeError,
    mutate: mutateInsertCode,
  } = useSWR<string>(`/api/code/${id}`, fetcher);
  const history = useHistory();

  if (websiteError || sessionsError) return <div>Fail..</div>;

  return (
    <CLayout ready={!!website} asynchronous>
      <Title level={3}>웹사이트 정보</Title>
      <Row gutter={16}>
        <Col span="24">
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              name: website?.name,
              domain: website?.domain,
              description: website?.description,
            }}
            onFinish={(formData) => {
              AxiosClient.patch(`/api/websites/${id}`, formData).then(() => {
                message.info("수정이 완료되었습니다");
                mutateWebsite();
              });
            }}
          >
            <Form.Item name="name" label="웹사이트 이름" required>
              <Input placeholder="내 웹사이트 1" />
            </Form.Item>
            <Form.Item name="domain" label="웹사이트 주소" required>
              <Input placeholder="mywebsite.com" />
            </Form.Item>
            <Form.Item name="description" label="웹사이트 설명" required>
              <Input.TextArea placeholder="나의 웹사이트입니다" rows={10} />
            </Form.Item>
            <Form.Item style={{ float: "right" }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  저장하기
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    const sure = window.confirm("정말로 삭제하시겠습니까?");
                    if (sure) {
                      AxiosClient.delete(`/api/websites/${id}`)
                        .then(() => {
                          history.push("/websites");
                          message.info("성공적으로 삭제되었습니다");
                        })
                        .catch((error) => {
                          console.error(error);
                          message.error("알 수 없는 오류가 발생했습니다");
                        });
                    }
                  }}
                >
                  삭제하기
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Title level={4}>삽입 코드</Title>
      <Row>
        <CodeDisplayer>
          <code>{insertCode}</code>
        </CodeDisplayer>
      </Row>
      <Title level={3}>세션 목록</Title>
      <Row justify="end" style={{ marginBottom: 20 }}>
        <Col>
          <Button
            size="middle"
            danger
            onClick={() => {
              const sure = window.confirm("정말로 삭제하시겠습니까?");
              if (sure) {
                console.log(selectedRowKeys);
                AxiosClient.post(`/api/delete-sessions`, {
                  sessionIdList: selectedRowKeys,
                })
                  .then(() => {
                    message.success("성공적으로 삭제되었습니다");
                    mutateSessions();
                  })
                  .catch((error) => {
                    console.error(error);
                    message.error("알 수 없는 오류가 발생했습니다");
                  });
              }
            }}
          >
            <b>선택 삭제</b>
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          style={{ width: "100%" }}
          columns={[
            { title: "ID", key: "id", dataIndex: "_id" },
            {
              title: "시간",
              key: "createdAt",
              dataIndex: "createdAt",
              render(value, record) {
                const text = dateFormat(new Date(value), "isoDateTime");
                return <div>{text}</div>;
              },
            },
            // {
            //   title: "사용자",
            //   dataIndex: "user",
            //   key: "user",
            //   render(value, record, index) {
            //     return (
            //       <Space>
            //         <Avatar icon={<UserOutlined />} size="small"></Avatar>
            //         <span>Shit</span>
            //       </Space>
            //     );
            //   },
            // },
            {
              title: "페이지",
              dataIndex: "location",
              key: "location",
              render(value, record, index) {
                return <a href={value.href}>{value.pathname}</a>;
              },
            },
            {
              title: "위치",
              dataIndex: "location",
              key: "location",
              render(value, record, index) {
                return (
                  <Tooltip title={record.ip}>
                    <Tag>{record.geoLocation.country}</Tag>
                  </Tooltip>
                );
              },
            },
            {
              title: "액션",
              render(value, record, index) {
                return (
                  <>
                    <Button href={`/sessions/${record._id}/recordings`}>
                      녹화 보기
                    </Button>
                  </>
                );
              },
            },
          ]}
          dataSource={sessions
            ?.sort((a, b) => b.createdAt - a.createdAt)
            .map((session) => ({
              ...session,
              key: session._id,
            }))}
          rowSelection={{
            type: "checkbox",
            onChange(nextSelectedRowKeys) {
              setSelectRowKeys(nextSelectedRowKeys);
              console.log(nextSelectedRowKeys);
            },
            selectedRowKeys,
          }}
        />
      </Row>
    </CLayout>
  );
}

const CodeDisplayer = styled.pre`
  background-color: #333;
  border-radius: 15px;
  color: white;
`;
export default WebsitePage;
